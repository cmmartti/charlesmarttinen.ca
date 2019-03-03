import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../../components/Layout';
import ArticleExcerpt from '../../components/ArticleExcerpt';

export default function CaseStudiesIndex({data, location}) {
    const {edges} = data.allMarkdownRemark;
    return (
        <Layout location={location}>
            <h1>Case Studies</h1>
            {edges.map(edge => {
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

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___datePublished]}
            filter: {fileAbsolutePath: {regex: "/src/content/blog/"}}
        ) {
            edges {
                node {
                    id
                    html
                    frontmatter {
                        published: datePublished(formatString: "MMMM D, YYYY")
                        publishedISO: datePublished(formatString: "YYYY-MM-DD")
                        updated: dateUpdated(formatString: "MMMM D, YYYY")
                        updatedISO: dateUpdated(formatString: "YYYY-MM-DD")
                        slug
                        title
                        tags
                        image {
                            relativePath
                            prettySize
                            childImageSharp {
                                resize(width:500 height: 500) {
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
`;
