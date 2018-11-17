import React from 'react';
import Helmet from 'react-helmet';
import {Link, graphql} from 'gatsby';

import Layout from '../../components/Layout';

export default function TagsPage({location, data}) {
    const {
        allMarkdownRemark: {group},
        site: {
            siteMetadata: {title},
        },
    } = data;
    return (
        <Layout location={location}>
            <Helmet title={title} />
            <div>
                <h1>Tags</h1>
                <ul>
                    {group.map(tag => (
                        <li key={tag.fieldValue}>
                            <Link to={`case-studies/tags/${tag.fieldValue}/`}>
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
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
            filter: {frontmatter: {published: {ne: false}}}
        ) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
