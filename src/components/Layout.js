import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';
import 'sanitize.css';

import SiteHeader from './SiteHeader';
import './Layout.global.scss';

const Layout = ({children}) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
            <>
                <Helmet
                    title={data.site.siteMetadata.title}
                    meta={[
                        {name: 'description', content: 'Sample'},
                        {name: 'keywords', content: 'sample, something'},
                    ]}
                >
                    <html lang="en" />
                </Helmet>
                <SiteHeader siteTitle={data.site.siteMetadata.title} />
                {children}
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
