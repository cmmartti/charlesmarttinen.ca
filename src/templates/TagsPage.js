import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../components/Layout';
import ArticleExcerpt from '../components/ArticleExcerpt';

export default function TagsPage({location, pageContext, data}) {
    const {tag} = pageContext;
    const {edges, totalCount} = data.allMarkdownRemark;

    const tagHeader = `${totalCount} post${
        totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`;

    return (
        <Layout location={location}>
            <h1>{tagHeader}</h1>
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
                const dates = {published, publishedISO, updated, updatedISO};

                return (
                    <ArticleExcerpt
                        key={id}
                        title={title}
                        dates={dates}
                        tags={tags}
                        image={image && image.childImageSharp.fluid.src}
                        excerptHtml={edge.node.fields.excerpt}
                        bodyHtml={edge.node.html}
                        path={`/blog/${slug}.html`}
                    />
                );
            })}
            <Link to="blog/tags/">All tags</Link>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: {fields: [frontmatter___datePublished], order: DESC}
            filter: {
                frontmatter: {tags: {in: [$tag]}}
                fileAbsolutePath: {regex: "//src/content/blog//"}
            }
        ) {
            totalCount
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
                                fluid(maxWidth: 500) {
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
