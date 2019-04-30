import React from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby';

import Layout from '../../components/Layout';

export default function TagsPage({location}) {
    const {tags} = useStaticQuery(graphql`
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
    `);

    return (
        <Layout location={location} title="Tags">
            <div>
                <h1>Tags</h1>
                <ul>
                    {tags.group.map(tag => (
                        <li key={tag.fieldValue}>
                            <Link to={`/blog/tags/${tag.fieldValue}.html`}>
                                {tag.fieldValue} ({tag.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}
