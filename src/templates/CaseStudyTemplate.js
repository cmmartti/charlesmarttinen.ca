import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import TagLink from '../components/TagLink';

export default function Template({data, location}) {
    const {markdownRemark} = data;
    const {frontmatter, html} = markdownRemark;
    const {title, date, tags} = frontmatter;
    console.log("tags", tags)

    return (
        <Layout location={location}>
            <h1>{title}</h1>
            <h2>{date}</h2>
            <p>
                Tags:{' '}
                {tags.forEach(tag => (
                    <TagLink key={tag} tag={tag} />
                ))}
            </p>
            <div dangerouslySetInnerHTML={{__html: html}} />
        </Layout>
    );
}

export const pageQuery = graphql`
    query($filename: String!) {
        markdownRemark(frontmatter: {filename: {eq: $filename}}) {
            html
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                tags
            }
        }
    }
`;
