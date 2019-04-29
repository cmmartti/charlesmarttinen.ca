import React from 'react';
import {graphql, Link} from 'gatsby';
import {css} from 'emotion';

import Layout from '../components/Layout';
import DateAndTags from '../components/DateAndTags';
import styles from './BlogEntry.module.scss';

function PrevNext({previous, next}) {
    return (
        <ul
            className={css`
                list-style-type: none;
                padding: 0;
                margin-bottom: 1em;

                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                > * {
                    min-width: 15em;
                    list-style: none;
                    flex: 1 1;
                    margin-top: 1em;
                    @media (max-width: 19em) {
                        min-width: 100%;
                    }
                }
            `}
        >
            {previous && (
                <li style={{marginRight: '2em'}}>
                    <Link to={previous.path} rel="prev" title="Previous">
                        &lt;&nbsp;{previous.title}
                    </Link>
                </li>
            )}
            {next && (
                <li
                    className={css`
                        text-align: right;
                        &:first-child {
                            flex: 1;
                        }
                    `}
                >
                    <Link to={next.path} rel="next" title="Next">
                        {next.title}&nbsp;&gt;
                    </Link>
                </li>
            )}
        </ul>
    );
}

export default function BlogEntry({data, location}) {
    const {article, previous, next, related, archive} = data;
    const {frontmatter, html} = article;
    const {
        title,
        published,
        publishedISO,
        updated,
        updatedISO,
        tags,
    } = frontmatter;
    const dates = {published, publishedISO, updated, updatedISO};
    const portrait = data.portrait.childImageSharp.resize.src;

    return (
        <Layout location={location} className={styles.page}>
            <div className={styles.content}>
                <div style={{flex: 1}} className="typography">
                    <p>
                        <Link to="/blog" className="underline-on-hover">
                            &lt; All writing
                        </Link>
                    </p>

                    <article>
                        <h1 style={{lineHeight: 1.2}}>{title}</h1>
                        <DateAndTags {...dates} tags={tags} />
                        <div dangerouslySetInnerHTML={{__html: html}} />
                    </article>
                </div>

                <hr />
                <p>
                    If you'd like to comment on something I've written,{' '}
                    <Link to="/contact.html">shoot me an email</Link>. If it's
                    of interest to others, I'll add it to the article as a
                    reader comment (please supply a name to use if you'd like to
                    be attributed).
                </p>

                <PrevNext
                    previous={
                        previous && {
                            path: previous.fields.path,
                            title: previous.frontmatter.title,
                        }
                    }
                    next={
                        next && {
                            path: next.fields.path,
                            title: next.frontmatter.title,
                        }
                    }
                />
            </div>

            <div className={styles.sidebar}>
                <div>
                    <img src={portrait} alt="me" />
                    <p>
                        I am Charles Marttinen (
                        <a
                            href="https://github.com/cmmartti"
                            title="GitHub profile"
                        >
                            cmmartti
                        </a>
                        ), a web developer from the Toronto region.
                    </p>
                    <p>
                        Every once in a while, I'll pull out a notebook and
                        pencil and write about something that interests me.
                    </p>
                    <p>
                        <a href="/rss.xml">RSS Feed</a>
                    </p>
                </div>

                {related.edges.length > 0 && (
                    <div>
                        <h3>Related</h3>
                        <ul>
                            {related.edges.map(edge => (
                                <li key={edge.node.id}>
                                    <Link to={edge.node.fields.path}>
                                        {edge.node.frontmatter.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {archive.edges.length > 0 && (
                    <div>
                        <h3>Archive</h3>
                        <ul>
                            {archive.edges.map(edge => (
                                <li key={edge.node.id}>
                                    <Link to={edge.node.fields.path}>
                                        {edge.node.frontmatter.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!, $previous: String, $next: String, $tags: [String]!) {
        article: markdownRemark(fields: {path: {eq: $path}}) {
            html
            frontmatter {
                title
                published: datePublished(formatString: "MMMM D, YYYY")
                publishedISO: datePublished(formatString: "YYYY-MM-DD")
                updated: dateUpdated(formatString: "MMMM D, YYYY")
                updatedISO: dateUpdated(formatString: "YYYY-MM-DD")
                tags
            }
            fields {
                path
            }
        }

        previous: markdownRemark(fields: {path: {eq: $previous}}) {
            frontmatter {
                title
            }
            fields {
                path
            }
        }
        next: markdownRemark(fields: {path: {eq: $next}}) {
            frontmatter {
                title
            }
            fields {
                path
            }
        }

        portrait: file(absolutePath: {regex: "//src/assets/me.jpg/"}) {
            childImageSharp {
                resize(width: 200, height: 200, quality: 100) {
                    src
                }
            }
        }

        related: allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___datePublished]}
            filter: {
                fileAbsolutePath: {regex: "//src/content/blog//"}
                frontmatter: {tags: {in: $tags}}
                fields: {path: {ne: $path}}
            }
            limit: 5
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                    }
                    fields {
                        path
                    }
                }
            }
        }

        archive: allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___datePublished]}
            filter: {
                fileAbsolutePath: {regex: "//src/content/blog//"}
                fields: {path: {ne: $path}}
            }
            limit: 5
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                    }
                    fields {
                        path
                    }
                }
            }
        }
    }
`;
