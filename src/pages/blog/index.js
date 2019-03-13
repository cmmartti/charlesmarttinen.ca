import React from 'react';
import {graphql, useStaticQuery, Link} from 'gatsby';

import Layout from '../../components/Layout';
import ArticleExcerpt from '../../components/ArticleExcerpt';
import Prose from '../../components/Prose';

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
                            slug
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
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout location={location}>
            <Prose>
                <h1>Writing</h1>
                <p>
                    Every once in a while, I pull out a pen and notebook and
                    write about something that interests me.
                </p>
                <p>
                    If you'd like to comment on something I've written,{' '}
                    <Link to="contact.html">shoot me an email</Link>. If it's
                    something others might be interested in too, I'll add it to the
                    article as a reader comment.
                </p>
            </Prose>
            {blogEntries.edges.map(edge => {
                const {
                    id,
                    slug,
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
                        path={`/blog/${slug}.html`}
                    />
                );
            })}
        </Layout>
    );
}
