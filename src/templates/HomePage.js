import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Project from '../components/Project';
import styles from './HomePage.module.scss';

export default function HomePage({data, location}) {
    const {homePage, projects} = data;
    const {frontmatter, html} = homePage;
    const {date, image, image_alt} = frontmatter;
    const imageSrc = image.childImageSharp.fluid.src;

    return (
        <Layout location={location} className="typography">
            <div className={styles.top}>
                <div className={styles.portrait}>
                    <img src={imageSrc} alt={image_alt} />
                </div>
                <div className={styles.intro}>
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{__html: html}}
                    />
                </div>
            </div>
            <div className={styles.projects}>
                <h2 id="projects">Projects</h2>
                {projects.edges.map(project => (
                    <Project
                        title={project.node.frontmatter.title}
                        htmlBody={project.node.html}
                        images={project.node.frontmatter.images.map(image => ({
                            src: image.src.childImageSharp.fluid.src,
                            alt: image.alt,
                            title: image.title,
                        }))}
                    />
                ))}
            </div>
            <div className={styles.bottom}>
                <p>Last updated: {date}</p>
            </div>
        </Layout>
    );
}

export const pageQuery = graphql`
    query {
        homePage: markdownRemark(
            fileAbsolutePath: {regex: "//src/content/homepage.md/"}
        ) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
                image {
                    childImageSharp {
                        fluid(maxWidth: 500) {
                            src
                        }
                    }
                }
                image_alt
            }
        }

        projects: allMarkdownRemark(
            sort: {order: ASC, fields: [frontmatter___order]}
            filter: {fileAbsolutePath: {regex: "//src/content/projects//"}}
            limit: 1000
        ) {
            edges {
                node {
                    html
                    frontmatter {
                        title
                        date
                        images {
                            src {
                                childImageSharp {
                                    fluid(maxHeight: 400) {
                                        src
                                    }
                                }
                            }
                            alt
                            title
                        }
                    }
                }
            }
        }
    }
`;
