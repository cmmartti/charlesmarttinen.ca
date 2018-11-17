import React from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../../components/Layout';
import TagLink from '../../components/TagLink';

export default function CaseStudiesIndex({data, location}) {
    const {edges} = data.allMarkdownRemark;
    return (
        <Layout location={location}>
            <h1>Case Studies</h1>
            {edges.map(edge => {
                const {filename, title, date, tags} = edge.node.frontmatter;
                const {excerpt} = edge.node;
                return (
                    <section key={edge.node.id}>
                        <h3>
                            <Link to={`/case-studies/${filename}`}>
                                {title} ({date})
                            </Link>
                        </h3>
                        <p>{excerpt}</p>
                        <p>
                            Tags:{' '}
                            {tags.map(tag => (
                                <TagLink key={tag} tag={tag} />
                            ))}
                        </p>
                    </section>
                );
            })}
        </Layout>
    );
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        filename
                        title
                        tags
                    }
                }
            }
        }
    }
`;
