import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../components/Layout';

export default function TagsTemplate({location, pageContext, data}) {
    const {tag} = pageContext;
    const {edges, totalCount} = data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`;

    return (
        <Layout location={location}>
            <h1>{tagHeader}</h1>
            <ul>
                {edges.map(({node}) => {
                    const {filename, title} = node.frontmatter;
                    return (
                        <li key={filename}>
                            <Link to={`/case-studies/${filename}`}>{title}</Link>
                        </li>
                    );
                })}
            </ul>
            <Link to="case-studies/tags/">All tags</Link>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {frontmatter: {tags: {in: [$tag]}}}
        ) {
            totalCount
            edges {
                node {
                    frontmatter {
                        title
                        filename
                        tags
                    }
                }
            }
        }
    }
`;
