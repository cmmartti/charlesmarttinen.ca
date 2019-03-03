import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout';
import DateAndTags from '../components/DateAndTags';
import styles from './BlogEntry.module.scss';

export default function BlogEntry({data, location}) {
    const {markdownRemark, previous, next, related, recent} = data;
    const {frontmatter, html} = markdownRemark;
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
        <Layout
            location={location}
            className={styles.page + ' site-content-defaults'}
        >
            <div className={styles.content}>
                <article className={styles.article}>
                    <h1 className={styles.title}>{title}</h1>
                    <DateAndTags {...dates} tags={tags} />
                    <div
                        className={styles.body + ' typography'}
                        dangerouslySetInnerHTML={{__html: html}}
                    />
                </article>

                <ul className={styles.nextprev}>
                    {previous && (
                        <li className={styles.previous}>
                            <Link
                                to={previous.fields.path}
                                rel="prev"
                                title="Previous"
                            >
                                ← {previous.frontmatter.title}
                            </Link>
                        </li>
                    )}
                    {next && (
                        <li className={styles.next}>
                            <Link to={next.fields.path} rel="next" title="Next">
                                {next.frontmatter.title} →
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            <div className={styles.sidebar}>
                <div className={styles.about}>
                    <div className={styles.portrait}>
                        <img src={portrait} alt="me" />
                    </div>
                    <div className={styles.abouttext}>
                        <p>
                            Case studies by Charles Marttinen (
                            <a
                                href="https://github.com/cmmartti"
                                title="GitHub profile"
                            >
                                cmmartti
                            </a>
                            ).
                        </p>
                        <p>
                            I write about objects and concepts with interesting
                            insights.
                        </p>
                    </div>
                </div>

                {related ? (
                    <div className={styles.related}>
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
                ) : (
                    <div className={styles.related}>
                        <h3>Recent</h3>
                        <ul>
                            {recent.edges.map(edge => (
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
        markdownRemark(fields: {path: {eq: $path}}) {
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

        recent: allMarkdownRemark(
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
