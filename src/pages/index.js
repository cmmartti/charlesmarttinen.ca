import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/Layout';
import portrait from '../images/me.jpg';

const IndexPage = ({location}) => (
    <Layout location={location}>
        <h1>Web Developer and Graphic Designer</h1>
        <h3>I like making simplified complexity.</h3>
        <p>
            That is, I like making complex things easy to use and understand
            without removing the underlying complexity, because complexity
            exists for a reason (humans and our needs are inherently complex).
        </p>
        <p>
            I primarily develop websites and user interfaces (full-stack), but I
            also do some print design.
        </p>
        <p>
            Check out some of the{' '}
            <Link to="portfolio.html">things I've made</Link>, or view my{' '}
            <Link to="resume.html">résumé</Link>. You can{' '}
            <Link to="contact.html">contact me</Link> at
            mail@charlesmarttinen.ca.
        </p>
        <p>
            I also keep a log that I call{' '}
            <Link to="case-studies/">Case Studies</Link> where I write about
            specific problems, concepts, or objects that I encounter in my day
            to day life.
        </p>

        <h2>About Me</h2>
        <p>
            I live in Barrie, Ontario, Canada, a medium-sized city about an hour
            from Toronto. I attended the Graphic Design Production program at
            the Georgian College of Applied Arts and Technology in Barrie and
            graduated in May 2018.
        </p>
        <p>
            Some of my interests outside of work include woodworking and
            recreational biking.
        </p>
        <p>
            I started writing code in high school, when I was about 17 years
            old. I started with AutoHotkey, a phenomonally inconsistent and
            bizarre yet simple scripting language for Windows. After that, I
            taught myself how to develop in PHP, and then moved on to JavaScript
            and ReactJS.
        </p>
        <hr />
        <h3>About this website</h3>
        <p>
            This website was developed in JavaScript using{' '}
            <a href="https://www.gatsbyjs.org/">Gatsby</a> using{' '}
            <a href="https://reactjs.org/">React</a> with a custom stylesheet.
        </p>
        <img src={portrait} alt="Me, gawping at the camera." />
    </Layout>
);

export default IndexPage;
