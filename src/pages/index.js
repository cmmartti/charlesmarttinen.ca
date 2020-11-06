import React from 'react';
import {graphql, Link, useStaticQuery} from 'gatsby';

import Layout from '../components/Layout';
import Project from '../components/Project';
import styles from './index.module.scss';

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
                        id
                        html
                        frontmatter {
                            title
                            date
                            #images {
                            #    src {
                            #        childImageSharp {
                            #            fluid(maxHeight: 1000) {
                           #                 src
                            #            }
                            #        }
                            #    }
                            #    alt
                            #    title
                            #}
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout location={location}>
            <div className={styles.intro}>
                <h1>Web Developer and Graphic Designer</h1>
                <h2>I like simplifying complexity.</h2>

                <p>
                    <img
                        className={styles.picture}
                        src={image.childImageSharp.fluid.src}
                        alt="Me"
                    />
                    That is, I like making complex interfaces easy to use and
                    understand, while still retaining the capabilities of a
                    complex system.
                </p>
                <p>
                    I primarily design and develop web applications and
                    websites, but I have also done some graphic design,
                    including{' '}
                    <a href="/blog/barrie-transit-map.html">
                        re‑designing my city's transit map
                    </a>
                    .
                </p>

                <p>
                If you like my work and need someone like me,{' '}
                    <Link to="/contact.html">get in touch!</Link>
                </p>

                <h2>About Me</h2>
                <p>
                    Based in the Toronto region (but willing to work remotely), I completed the Graphic Design
                    Production program at the Georgian College in May 2018.
                    Since then, I have further developed my programming skills
                    through full-time self-directed learning, on top of my
                    previous experience at the Port of Wilmington, Delaware, and
                    earlier forays into programming going back to high school.{' '}
                </p>
                <p>
                    To read more about my skills and experience, see my{' '}
                    <Link to="/resume.html">online résumé</Link> or look through
                    some of my projects below.
                </p>

                <h2 id="projects">Projects</h2>
            </div>
            <div>
                {projects.edges.map(project => (
                    <Project
                        key={project.node.id}
                        title={project.node.frontmatter.title}
                        htmlBody={project.node.html}
                        images={[]}
                        // images={project.node.frontmatter.images.map(image => ({
                        //     src: image.src.childImageSharp.fluid.src,
                        //     alt: image.alt,
                        //     title: image.title,
                        // }))}
                    />
                ))}
            </div>
        </Layout>
    );
}
