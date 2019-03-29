import React from 'react';
import {graphql, useStaticQuery, Link} from 'gatsby';
import {css} from 'emotion';

import Layout from '../../components/Layout';
import ArticleExcerpt from '../../components/ArticleExcerpt';

export default function CaseStudiesIndex({location}) {
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
                            excerpt
                            path
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout location={location}>
            <div
                className={
                    css`
                        padding: 0 1em;
                        padding: 0 var(--content-padding);
                    ` + ' typography'
                }
            >
                <h1>Writing</h1>
                <p>
                    Every once in a while, I'll pull out a notebook and pencil and
                    write about something that interests me.
                </p>
                {/* <p>
                    If you'd like to comment on something I've written,{' '}
                    <Link to="/contact.html">shoot me an email</Link>. If it's
                    of interest to others, I'll add it to the article as a
                    reader comment (please supply a name to use if you'd like to
                    be attributed).
                </p> */}
            </div>

            {blogEntries.edges.map(edge => {
                const {
                    id,
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
                        excerptHtml={edge.node.fields.excerpt}
                        bodyHtml={edge.node.html}
                        path={edge.node.fields.path}
                    />
                );
            })}
        </Layout>
    );
}
