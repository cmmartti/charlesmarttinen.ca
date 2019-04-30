import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = ({location}) => (
    <Layout location={location} titl="404 Not Found">
        <h1>Not Found</h1>
        <p>It looks like that page doesn't exist. Sorry!</p>
        <p>Error 404</p>
    </Layout>
);

export default NotFoundPage;
