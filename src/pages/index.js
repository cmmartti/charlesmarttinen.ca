import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout';
import Project from '../components/Project';
import styles from './index.module.scss';

export default function HomePage({data, location}) {
    const {image, projects} = data;

    return (
        <Layout location={location} className="x">
            <div className={styles.top + ' typography'}>
                <div className={styles.portrait}>
                    <img src={image.childImageSharp.fluid.src} alt="Me" />
                </div>
                <div className={styles.intro}>
                    <h1>Web Developer and Graphic Designer</h1>
                    <h2>I like simplifying complexity.</h2>
                    <p>
                        That is, I like making complex things easy to use and
                        understand, while still retaining the capabilities of a
                        complex system.
                    </p>
                    <p>
                        I primarily design and develop web applications and
                        websites, but I have also done some print design,
                        including re‑designing my city's transit map.
                    </p>
                    <h2>About Me</h2>
                    <p>
                        Based in Toronto, I completed the Graphic Design
                        Production program at the Georgian College in May 2018.
                        Since then, I have further developed my programming
                        skills through full-time self-directed learning, on top
                        of my previous programming experience at the Port of
                        Wilmington, Delaware, and earlier forays into
                        programming going back to high school.{' '}
                    </p>
                    <p>
                        To read more about my skills and experience, see my{' '}
                        <Link to="resume.html">online résumé</Link>.
                    </p>
                </div>
            </div>
            <div className={styles.projects + ' typography'}>
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
        </Layout>
    );
}

export const pageQuery = graphql`
    query {
        image: file(relativePath: {eq: "images/me.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 500) {
                    src
                }
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
