import React from 'react';
import {graphql, Link, useStaticQuery} from 'gatsby';
import {css} from 'emotion';

import Layout from '../components/Layout';
import Project from '../components/Project';
import styles from './index.module.scss';
import Prose from '../components/Prose';

export default function HomePage({location}) {
    const {image, projects} = useStaticQuery(graphql`
        query {
            image: file(relativePath: {eq: "assets/me.jpg"}) {
                childImageSharp {
                    fluid(maxWidth: 300) {
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
    `);

    return (
        <Layout location={location}>
            <Prose>
                <h1>Web Developer and Graphic Designer</h1>
                <h2>I like simplifying complexity.</h2>

                <p>
                    <img
                        className={css`
                            float: right;
                            margin: 0 0 1em 1em;
                            display: block;
                            max-width: 12em;
                        `}
                        src={image.childImageSharp.fluid.src}
                        alt="Me"
                    />
                    That is, I like making complex interfaces easy to use and
                    understand, while still retaining the capabilities of a
                    complex system.
                </p>
                <p>
                    I primarily design and develop web applications and
                    websites, but I have also done some print design, including
                    re‑designing my city's transit map.
                </p>
                <h2>About Me</h2>
                <p>
                    Based in Toronto, I completed the Graphic Design Production
                    program at the Georgian College in May 2018. Since then, I
                    have further developed my programming skills through
                    full-time self-directed learning, on top of my previous
                    programming experience at the Port of Wilmington, Delaware,
                    and earlier forays into programming going back to high
                    school.{' '}
                </p>
                <p>
                    To read more about my skills and experience, see my{' '}
                    <Link to="resume.html">online résumé</Link>.
                </p>
            </Prose>
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
