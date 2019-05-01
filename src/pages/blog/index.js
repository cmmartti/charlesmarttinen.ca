import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';

import Layout from '../../components/Layout';
import ArticleExcerpt from '../../components/ArticleExcerpt';
import styles from './index.module.scss';

export default function BlogIndex({location}) {
    const {blogEntries} = useStaticQuery(graphql`
        query {
            blogEntries: allMarkdownRemark(
                sort: {order: DESC, fields: [frontmatter___datePublished]}
                filter: {fileAbsolutePath: {regex: "/src/content/blog/"}}
            ) {
                edges {
                    node {
                        id
                        html
                        frontmatter {
                            published: datePublished(
                                formatString: "MMMM D, YYYY"
                            )
                            publishedISO: datePublished(
                                formatString: "YYYY-MM-DD"
                            )
                            updated: dateUpdated(formatString: "MMMM D, YYYY")
                            updatedISO: dateUpdated(formatString: "YYYY-MM-DD")
                            title
                            tags
                            image {
                                relativePath
                                prettySize
                                childImageSharp {
                                    resize(width: 500, height: 500) {
                                        src
                                    }
                                }
                            }
                        }
                        fields {
                            excerptHtml
                            path
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout location={location} title="Writing">
            <div className={styles.intro}>
                <h1>Writing</h1>
                <p>
                    I am Charles Marttinen (
                    <a
                        href="https://github.com/cmmartti"
                        title="GitHub profile"
                    >
                        cmmartti
                    </a>
                    ), a web developer from the Toronto region. Every once in a
                    while, I'll pull out a notebook and pencil and write about
                    something that interests me.{' '}
                </p>
                <p>
                    <a href="/rss.xml">RSS Feed</a>
                </p>
            </div>

            {blogEntries.edges.map(edge => {
                const {id, html} = edge.node;
                const {excerptHtml, path} = edge.node.fields;
                const {
                    title,
                    published,
                    publishedISO,
                    updated,
                    updatedISO,
                    tags,
                    image,
                } = edge.node.frontmatter;

                return (
                    <ArticleExcerpt
                        key={id}
                        title={title}
                        dates={{
                            published,
                            publishedISO,
                            updated,
                            updatedISO,
                        }}
                        tags={tags}
                        image={image && image.childImageSharp.resize.src}
                        excerptHtml={excerptHtml}
                        bodyHtml={html}
                        path={path}
                    />
                );
            })}
        </Layout>
    );
}
