import React from 'react';
import {Link, graphql} from 'gatsby';
import {css} from 'emotion';

import Layout from '../components/Layout';
import ArticleExcerpt from '../components/ArticleExcerpt';

export default function TagsPage({location, pageContext, data}) {
    const {tag} = pageContext;
    const {edges, totalCount} = data.allMarkdownRemark;

    const tagHeader = `${totalCount} post${
        totalCount === 1 ? '' : 's'
    } tagged with [${tag}]`;

    return (
        <Layout location={location}>
            <div style={{padding: '0 var(--content-padding'}}>
                <p>
                    <Link to="/blog/tags/" className="underline-on-hover">
                        &lt; All tags
                    </Link>
                </p>

                <h1 style={{lineHeight: 1.2}}>{tagHeader}</h1>
            </div>

            {edges.map(edge => {
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
                        path={edge.node.fields.path}
                    />
                );
            })}
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
                        path
                    }
                }
            }
        }
    }
`;