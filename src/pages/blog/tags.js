import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../../components/Layout';

export default function TagsPage({location, data}) {
    const tags = data.tags.group;
    return (
        <Layout location={location}>
            <div>
                <h1>Tags</h1>
                <ul>
                    {tags.map(tag => (
                        <li key={tag.fieldValue}>
                            <Link
                                to={`blog/tags/${tag.fieldValue}.html`}
                            >
                                {tag.fieldValue} ({tag.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export const pageQuery = graphql`
    query {
        tags: allMarkdownRemark(
            limit: 2000
            filter: {fileAbsolutePath: {regex: "//src/content/blog//"}}
        ) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
