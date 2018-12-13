import React from 'react';
import {graphql} from 'gatsby';
import ImageScroller from 'react-image-scroller'; // made by me!

import Layout from '../components/Layout';
import styles from './HomePage.module.scss';

import {css, cx} from 'emotion';
function IndexButton(props) {
    const {innerProps, image, index, isCurrent, isNext, isPrevious} = props;

    const base = css`
        pointer-events: auto;
        max-width: 3.5rem;
        max-height: 3.5rem;
        margin: 0.5rem;
        padding: 0;
        border: none;
        background: none;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-shadow: inset 0 0 3px 0 hsla(0, 0%, 0%, 50%);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center top;
        }
    `;

    const current = css`
        border: 2px solid red;
    `;

    // const nextOrPrevious = css`
    //     width: 1.4em;
    //     height: 1.4em;
    //     margin: 0 0.65em;

    //     & + &::after {
    //         content: '';
    //         display: block;
    //         height: 0.75em;
    //         width: 0.75em;
    //         transform: translateX(-1em);
    //         background: black;
    //         border-radius: 100%;
    //     }
    // `;

    return (
        <button
            className={cx({
                [base]: true,
                [current]: isCurrent,
                // [nextOrPrevious]: isNext || isPrevious,
            })}
            title={index}
            {...innerProps}
        >
            {image}
        </button>
    );
}

function Project({title, body, images}) {
    return (
        <div className={styles.project}>
            <div className={styles.description}>
                <h3>{title}</h3>
                <div dangerouslySetInnerHTML={{__html: body}} />
            </div>
            <ImageScroller
                className={styles.imageScroller}
                // components={{IndexButton}}
                components={{IndexButtonsContainer: () => null}}
            >
                {images.map(image => (
                    <img src={image.src} alt={image.alt} />
                ))}
            </ImageScroller>
        </div>
    );
}

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
                        body={project.node.html}
                        images={project.node.frontmatter.images.map(image => ({
                            src: image.src.childImageSharp.original.src,
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
                        fluid(maxWidth: 400) {
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
                                    original {
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
