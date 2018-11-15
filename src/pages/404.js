import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = ({location}) => (
    <Layout location={location}>
        <h1>NOT FOUND</h1>
        <p>It looks like that page doesn't exist. Sorry!</p>
        <p>Error 404</p>
    </Layout>
);

export default NotFoundPage;
