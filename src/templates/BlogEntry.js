import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout';
import Date from '../components/Date';
import styles from './BlogEntry.module.scss';

export default function BlogEntry({data, location}) {
    const {article, previous, next, related, archive} = data;
    const {frontmatter, html} = article;
    const {title, published, publishedISO, updated, updatedISO} = frontmatter;
    const dates = {published, publishedISO, updated, updatedISO};
    const portrait = data.portrait.childImageSharp.resize.src;

    return (
        <Layout location={location} className={styles.page} title={title}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <p>
                        <Link to="/blog">&lt; All writing</Link>
                    </p>

                    <article>
                        <h1 className={styles.title}>{title}</h1>
                        <Date {...dates} />
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

                <ul className={styles.prevnext}>
                    {previous && (
                        <li className={styles.prev}>
                            <Link
                                to={previous.fields.path}
                                rel="prev"
                                title="Previous"
                            >
                                &lt;&nbsp;{previous.frontmatter.title}
                            </Link>
                        </li>
                    )}
                    {next && (
                        <li className={styles.next}>
                            <Link to={next.fields.path} rel="next" title="Next">
                                {next.frontmatter.title}&nbsp;&gt;
                            </Link>
                        </li>
                    )}
                </ul>
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
    query($path: String!, $previous: String, $next: String) {
        article: markdownRemark(fields: {path: {eq: $path}}) {
            html
            frontmatter {
                title
                published: datePublished(formatString: "MMMM D, YYYY")
                publishedISO: datePublished(formatString: "YYYY-MM-DD")
                updated: dateUpdated(formatString: "MMMM D, YYYY")
                updatedISO: dateUpdated(formatString: "YYYY-MM-DD")
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
