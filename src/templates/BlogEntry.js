import React from 'react';
import {graphql, Link} from 'gatsby';
import {css} from 'emotion';

import Layout from '../components/Layout';
import DateAndTags from '../components/DateAndTags';
import styles from './BlogEntry.module.scss';

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
            <div
                className={'typography ' + styles.content}
                style={{padding: '0 var(--content-padding)'}}
            >
                <p>
                    <Link to="/blog" className="underline-on-hover">
                        &lt; All writing
                    </Link>
                </p>
                <article className={styles.article}>
                    <h1 className={styles.title}>{title}</h1>
                    <DateAndTags {...dates} tags={tags} />
                    <div dangerouslySetInnerHTML={{__html: html}} />
                </article>

                <p>
                    If you'd like to comment on something I've written,{' '}
                    <Link to="/contact.html">shoot me an email</Link>. If it's
                    of interest to others, I'll add it to the article as a
                    reader comment (please supply a name to use if you'd like to
                    be attributed).
                </p>

                <ul>
                    {previous && (
                        <li>
                            <Link
                                to={previous.fields.path}
                                rel="prev"
                                title="Previous"
                            >
                                &lt; {previous.frontmatter.title}
                            </Link>
                        </li>
                    )}
                    {next && (
                        <li>
                            <Link to={next.fields.path} rel="next" title="Next">
                                {next.frontmatter.title} &gt;
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            <div className={styles.sidebar}>
                <div>
                    <img src={portrait} alt="me" />
                    <p>
                        Written by Charles Marttinen (
                        <a
                            href="https://github.com/cmmartti"
                            title="GitHub profile"
                        >
                            cmmartti
                        </a>
                        ), web developer and graphic designer.
                    </p>
                </div>
                <div>
                    <h3>{related ? 'Related' : 'Archive'}</h3>
                    <ul>
                        {(related || archive).edges.map(edge => (
                            <li key={edge.node.id}>
                                <Link to={edge.node.fields.path}>
                                    {edge.node.frontmatter.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
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
                image {
                    childImageSharp {
                        fluid(maxWidth: 500) {
                            src
                        }
                    }
                }
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
