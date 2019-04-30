import React from 'react';
import {Link} from 'gatsby';
import {css} from 'emotion';

import Layout from '../components/Layout';
// import resumePdf from '../assets/résumé.pdf';

function Section({title, children}) {
    return (
        <div
            className={css`
                display: flex;
                margin: 1em 0;
                @media (max-width: 45em) {
                    display: block;
                    margin-bottom: 2em;
                }
            `}
        >
            <h2
                className={css`
                    flex: 1;
                    min-width: 0em;
                    max-width: 20em;
                    text-align: right;
                    padding-top: 0.5em;
                    margin-right: 0.25em;
                    @media (max-width: 45em) {
                        max-width: none;
                        text-align: left;
                        padding: 0;
                    }
                `}
            >
                {title}
            </h2>
            <div
                className={
                    css`
                        flex: 4.75;
                        min-width: 0;
                        margin: 0 0.5em;

                        & > * {
                            border-left: 1px solid black;
                            padding-left: 0.75em;
                            margin-bottom: 1em;
                        }
                    ` + ' typography'
                }
            >
                {children}
            </div>
        </div>
    );
}

export default function ResumePage({location}) {
    return (
        <Layout location={location} title="Résumé">
            <div
                className={
                    css`
                        padding: 0 1em;
                        padding: 0 var(--content-padding);
                    ` + ' typography'
                }
            >
                <h1>Résumé</h1>
                {/* <p>
                    You can download this résumé in PDF format{' '}
                    <a href={resumePdf}>here</a>. Thanks for taking a look at
                    it.
                </p> */}
                <p>
                    <Link to="/contact.html">Contact me</Link>, or view my{' '}
                    <a href="https://linkedin.com/in/charles-marttinen">
                        LinkedIn profile
                    </a>
                    .
                </p>
                <hr />
                <Section title="Skills">
                    <div>
                        <h3>Front-end</h3>
                        <p>
                            I am proficient in modern JavaScript, the DOM,
                            React, semantic HTML, and CSS (with Sass). I enjoy
                            creating custom CSS styles from scratch (like on
                            this site), and I have experience creating
                            fully-accessible custom input elements, like menus
                            and search-ahead dropdowns.
                        </p>
                    </div>

                    <div>
                        <h3>Back-end</h3>
                        <p>
                            I have used Python, Node, and PHP to create
                            applications and APIs on top of relational
                            databases. At my previous job, using PHP and Symfony
                            Framework, I started the re‑development of the
                            internal inventory system which involved writing
                            high performance SQL queries to interface with a
                            legacy Oracle database.
                        </p>
                        <p>
                            More recently, I have created a large, open-source
                            GraphQL API for{' '}
                            <a href="https://pokeapi.co">PokéAPI</a> using
                            Python, Django, and{' '}
                            <a href="https://graphene-python.org/">
                                Graphene-Python
                            </a>
                            .
                        </p>
                    </div>

                    <div>
                        <p>Test-driven development (large GraphQL API)</p>
                    </div>

                    <div>
                        <h3>Languages</h3>
                        <p>
                            JavaScript (ES6+), HTML, CSS, Python, PHP, SQL
                            (Oracle, MySQL, PostgresQL).
                        </p>
                    </div>

                    <div>
                        <h3>Libraries</h3>
                        <p>
                            React, Graphene-Python (GraphQL), Apollo GraphQL,
                            Symfony Framework (PHP), and jQuery, among others.
                        </p>
                    </div>

                    <div>
                        <h3>Design</h3>
                        <p>Adobe Illustrator, InDesign, Photoshop</p>
                        <p>UI/UX design</p>
                    </div>
                </Section>
                <Section title="Education">
                    <div>
                        <h3>Self-directed learning</h3>
                        <p>Spring 2018–Present</p>
                        <p>
                            <em>See </em>
                        </p>
                    </div>

                    <div>
                        <h3>Georgian College of Applied Arts and Technology</h3>
                        <p>Graphic Design Production</p>
                        <p>Fall 2016—Spring 2018</p>
                    </div>
                </Section>
                <Section title="Work Experience">
                    <div>
                        <h3>Port of Wilmington, Delaware</h3>
                        <em>Software Programmer</em>
                        <p>March 2015–May 2016</p>
                        <ul>
                            <li>
                                Focused on graphic and user experience design
                            </li>
                            <li>
                                Redesigned and began long-term rebuild of
                                company Intranet
                            </li>
                            <li>
                                Designed and built web-based forklift-mounted
                                tablet system for managing pallet movements
                                within warehouses
                            </li>
                            <li>
                                Designed and built mobile web-app for tracking
                                shipping container movements for use in the
                                field
                            </li>
                            <li>Created and used REST and SOAP web APIs</li>
                            <li>
                                Used the following technologies extensively:
                                Oracle SQL , PHP, CSS/HTML, JavaScript, Symfony2
                                framework, React.js
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>The City of Barrie</h3>
                        <p>Facilities Generalist</p>
                        <p>Spring 2014–March 2015</p>
                        <p>
                            Cleaned two public buildings and handled minor
                            repairs
                        </p>
                    </div>
                    <div>
                        <h3>Marttinen Finish Carpentry</h3>
                        <p>Finish Carpenter</p>
                        <p>January 2009–March 2014</p>
                        <p>April 2017–August 2017</p>
                    </div>
                </Section>
                <Section title="Certifi&shy;cations">
                    <div>
                        <h3>
                            <a href="http://www.zend.com/en/yellow-pages/ZEND027372">
                                Zend Certified PHP Engineer
                            </a>
                        </h3>
                        <p>July 2015</p>
                    </div>
                </Section>
            </div>
        </Layout>
    );
}
