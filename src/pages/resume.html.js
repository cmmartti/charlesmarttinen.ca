import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/Layout';
import ResumeSection from '../components/ResumeSection';
import resumePdf from '../assets/résumé.pdf';

export default function ResumePage({location}) {
    return (
        <Layout
            location={location}
            className="site-content-defaults typography"
        >
            <h1>Résumé</h1>
            <p>
                You can download this résumé in PDF format{' '}
                <a href={resumePdf}>here</a>. Thanks for taking a look at it.
            </p>
            <p>
                You can contact me <Link to="contact.html">here</Link>, or view
                my{' '}
                <a href="https://linkedin.com/in/charles-marttinen">
                    LinkedIn profile
                </a>
                .
            </p>
            <hr />
            <ResumeSection title="Skills">
                <div>
                    <h3>Front-end</h3>
                    <p>
                        I am proficient in modern JavaScript, the DOM, React,
                        semantic HTML, and CSS (with Sass). I enjoy creating
                        custom CSS styles from scratch (like on this site), and
                        I have experience creating fully-accessible custom input
                        elements, like menus and search-ahead dropdowns.
                    </p>
                </div>

                <div>
                    <h3>Back-end</h3>
                    <p>
                        I have used Python, Node, and PHP to create applications
                        and APIs on top of relational databases. At my previous
                        job, using PHP and Symfony Framework, I started the
                        re‑development of the internal inventory system which
                        involved writing high performance SQL queries to
                        interface with a legacy Oracle database.
                    </p>
                    <p>
                        More recently, I have created a large, open-source
                        GraphQL API for <a href="https://pokeapi.co">PokéAPI</a>{' '}
                        using Python, Django, and{' '}
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
                        JavaScript (ES6+), HTML, CSS, Python, PHP, SQL (Oracle,
                        MySQL, PostgresQL).
                    </p>
                </div>

                <div>
                    <h3>Libraries</h3>
                    <p>
                        React, Graphene-Python (GraphQL), Symfony Framework
                        (PHP), and jQuery, among others.
                    </p>
                </div>

                <div>
                    <h3>Design</h3>
                    <p>Adobe Illustrator, InDesign, Photoshop</p>
                    <p>UI/UX design</p>
                </div>
            </ResumeSection>
            <ResumeSection title="Education">
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
            </ResumeSection>
            <ResumeSection title="Work Experience">
                <div>
                    <h3>Port of Wilmington, Delaware</h3>
                    <em>Software Programmer</em>
                    <p>March 2015–May 2016</p>
                    <ul>
                        <li>Focused on graphic and user experience design</li>
                        <li>
                            Redesigned and began long-term rebuild of company
                            Intranet
                        </li>
                        <li>
                            Designed and built web-based forklift-mounted tablet
                            system for managing pallet movements within
                            warehouses
                        </li>
                        <li>
                            Designed and built mobile web-app for tracking
                            shipping container movements for use in the field
                        </li>
                        <li>Created and used REST and SOAP web APIs</li>
                        <li>
                            Used the following technologies extensively: Oracle
                            SQL , PHP, CSS/HTML, JavaScript, Symfony2 framework,
                            React.js
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>The City of Barrie</h3>
                    <p>Facilities Generalist</p>
                    <p>Spring 2014–March 2015</p>
                    <p>
                        Cleaned two public buildings and handled minor repairs
                    </p>
                </div>
                <div>
                    <h3>Marttinen Finish Carpentry</h3>
                    <p>Finish Carpenter</p>
                    <p>January 2009–March 2014</p>
                    <p>April 2017–August 2017</p>
                </div>
            </ResumeSection>
            <ResumeSection title="Certifi&shy;cations">
                <div>
                    <h3>
                        <a href="http://www.zend.com/en/yellow-pages/ZEND027372">
                            Zend Certified PHP Engineer
                        </a>
                    </h3>
                    <p>July 2015</p>
                </div>
            </ResumeSection>

            <p>Last updated:</p>
        </Layout>
    );
}
