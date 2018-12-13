import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import styles from './Resume.module.scss';

export default function ResumeTemplate({data, location}) {
    const {homePage} = data;
    const {frontmatter, html} = homePage;

    return (
        <Layout location={location} className={styles.columns}>
            <div
                className={styles.body}
                dangerouslySetInnerHTML={{__html: html}}
            />
            <p className={styles.updated_at}>
                Last updated: {frontmatter.date}
            </p>
        </Layout>
    );
}

export const pageQuery = graphql`
    query {
        homePage: markdownRemark(
            fileAbsolutePath: {regex: "//src/content/resume.md/"}
        ) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
            }
        }
    }
`;
