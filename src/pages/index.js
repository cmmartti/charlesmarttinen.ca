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
            without compromising on requirements that make a system complex. I'm a practical...
        </p>
        <p>
            I primarily develop web applications, websites, and user interfaces
            (full-stack), but I also do some print design. Check out some of the{' '}
            <Link to="projects.html">things I've made</Link>.
        </p>
        <p>
            I also keep a log on this site that I call{' '}
            <Link to="case-studies/">Case Studies</Link>, where I write about
            specific problems, concepts, or objects that I encounter in my day
            to day life. Each of these cases offers an interesting insight, and
            in the log I dig into why it works or how it could be improved.
        </p>
        <p>
            Please <Link to="contact.html">get in touch</Link> if your looking
            for someone like me. or view my <Link to="resume.html">résumé</Link>
            .
        </p>

        <h2>About Me</h2>
        <p>
            I live in Barrie, Ontario, Canada, a medium-sized city near Toronto.
            I completed the Graphic Design Production program at the Georgian
            College of Applied Arts and Technology in Barrie in May 2018.
        </p>
        <p>
            I started writing code in high school, when I was 17 years old. I
            started with AutoHotkey, a phenomonally inconsistent and bizarre yet
            simple scripting language for Windows. From there, I taught myself
            PHP, and then moved on to Python and JavaScript, using technologies
            like <a href="https://graphql.org">GraphQL</a> and{' '}
            <a href="https://reactjs.org">React</a>. <a href="https://dsfasd.com">Not visited</a>
        </p>
        <p>
            Some of my interests outside of work include woodworking and cycling
        </p>

        <img src={portrait} alt="Me, gawping at the camera." />
    </Layout>
);

export default IndexPage;
