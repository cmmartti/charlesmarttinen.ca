import React from 'react';

import Layout from '../components/Layout';
import styles from './resume.module.scss';

import pdf from '../marttinen-charles_resume.pdf';
import GithubLogoSvg from '../assets/github-octocat.svg';
import LinkedInLogoSvg from '../assets/linkedin-in.svg';
import EnvelopeSvg from '../assets/envelope.svg';
import PhoneSvg from '../assets/phone.svg';

function Section({title, children}) {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

export default function ResumePage({location}) {
    return (
        <Layout location={location} title="Résumé">
            <div className={styles.page}>
                <div className="noprint">
                    <p>
                        <a href={pdf}>Download PDF</a>
                    </p>
                    <hr />
                </div>

                <div className={styles.header}>
                    <h1 className={styles.title}>Charles Marttinen</h1>
                    <div className={styles.contact}>
                        <div>
                            <p>
                                <PhoneSvg aria-label="Telephone" />{' '}
                                <a href="tel:+17057704095">
                                    +1&nbsp;705&#8209;770&#8209;4095
                                </a>
                            </p>
                            <p>
                                <EnvelopeSvg aria-label="E-mail" />{' '}
                                <a href="mailto:mail@charlesmarttinen.ca">
                                    mail@charlesmarttinen.ca
                                </a>
                            </p>
                        </div>
                        <div>
                            <p>
                                <GithubLogoSvg aria-label="GitHub" />{' '}
                                <a
                                    href="https://github.com/cmmartti"
                                    target="_blank"
                                >
                                    GitHub.com/cmmartti
                                </a>
                            </p>
                            <p>
                                <LinkedInLogoSvg aria-label="Linked In" />{' '}
                                <a
                                    href="https://www.linkedin.com/in/cmmartti/"
                                    target="_blank"
                                >
                                    Linkedin.com/in/cmmartti
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <Section title="Summary">
                    <div>
                        <p>
                            Full stack developer experienced in designing and
                            building web applications and APIs in JavaScript
                            (React + TypeScript) and Python/Node/PHP.
                        </p>
                    </div>
                </Section>

                <Section title="Skills">
                    <h3>Front-end/Browser</h3>
                    <ul>
                        <li>
                            JavaScript (ES5+): browser DOM API, TypeScript,
                            React, Redux, GatsbyJS, GraphQL and REST APIs,
                            jQuery
                        </li>
                        <li>Accessible HTML and advanced CSS (Sass)</li>
                    </ul>

                    <h3>Back-end</h3>
                    <ul>
                        <li>
                            Node.js with TypeScript, Python (Django),
                            Graphene-Python (GraphQL server), PHP (Symfony
                            Framework)
                        </li>
                        <li>SQL (Oracle, MySQL, PostgresQL)</li>
                        <li>Firebase, CircleCI, Linux, Netlify</li>
                        <li>Test-driven development</li>
                    </ul>

                    <h3>Design</h3>
                    <ul>
                        <li>UI design focusing on usability and UX</li>
                        <li>
                            Adobe Suite (XD, Illustrator, InDesign, Photoshop)
                        </li>
                        <li>Vector graphics and logos</li>
                    </ul>
                </Section>

                <Section title="Experience">
                    <h3>
                        <a href="https://pokeapi.co">PokéAPI</a> (open source
                        public REST API for Pokémon data)
                    </h3>
                    <p>
                        <em>Core Maintainer (volunteer)</em> / Summer 2018 –
                        Present
                    </p>
                    <p>
                        I re-built and maintain the website, handle support
                        requests, and helped migrate to new static hosting on
                        Firebase with automated deployments using CircleCI.
                    </p>

                    <h3>Marttinen Finish Carpentry</h3>
                    <p>
                        <em>Finish Carpenter</em> / July 2019 – Present, January
                        – May 2017, 2009 – 2014
                    </p>

                    <h3>Port of Wilmington, Delaware</h3>
                    <p>
                        <em>Software Programmer</em> / March 2015 – May 2016
                    </p>
                    <ul>
                        <li>
                            Redesigned and began long-term rebuild of company
                            Intranet based on Symfony Framework (PHP)
                        </li>
                        <li>
                            Built pilots of web-based forklift-mounted tablet
                            system for managing pallet movements within
                            warehouses and mobile web-app for tracking shipping
                            container movements for use in the field (React)
                        </li>
                        <li>Created and used REST and SOAP web APIs</li>
                    </ul>

                    <h3>The City of Barrie</h3>
                    <p>
                        <em>Facilities Generalist</em> / Spring 2014 – March
                        2015
                    </p>
                    <p>
                        Cleaned two public buildings and handled minor repairs.
                    </p>
                </Section>

                <Section title="Education">
                    <h3>Self-directed</h3>
                    <p>
                        <em>Web Development</em> / May 2018 – June 2019
                        (full-time)
                    </p>
                    <h3>Georgian College of Applied Arts and Technology</h3>
                    <p>
                        Diploma in <em>Graphic Design Production</em> /
                        September 2016 – May 2018
                    </p>
                    <h3>Ontario Secondary School Diploma</h3>
                    <p>2013</p>
                </Section>

                <Section title="Misc.">
                    <h3>
                        <a href="http://www.zend.com/en/yellow-pages/ZEND027372">
                            Zend PHP Engineer Certification
                        </a>{' '}
                    </h3>
                    <p>July 2015</p>
                </Section>
            </div>
        </Layout>
    );
}
