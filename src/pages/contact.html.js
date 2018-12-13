import React from 'react';

import Layout from '../components/Layout';

const ContactPage = ({location}) => (
    <Layout location={location} className="typography site-content-defaults">
        <h1>Contact Me</h1>
        <p>
            You can reach me at{' '}
            <a href="mailto:mail@charlesmarttinen.ca">
                mail@charlesmarttinen.ca
            </a>
            .
        </p>

        <p>
            Alternatively, you can send me an email using the contact form
            below.
        </p>

        <form
            action="https://formspree.io/kjaregvbu6erawejkenh@outlook.com"
            method="POST"
            className="form"
        >
            <div>
                <label htmlFor="name">Your Name</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="email">Your Email Address</label>
                <input type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" />
            </div>
            <div>
                <button type="submit">Send</button>
            </div>
        </form>
    </Layout>
);

export default ContactPage;
