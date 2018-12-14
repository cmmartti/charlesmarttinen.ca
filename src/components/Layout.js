import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';
import 'sanitize.css';
import classNames from 'classnames';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ViewportSize from './ViewportSize';
import './Layout.global.scss';

const Layout = ({children, location, className, ...props}) => (
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
                <SiteHeader
                    siteTitle={data.site.siteMetadata.title}
                    location={location}
                />
                <main
                    className={classNames(
                        'site-content',
                        className || 'site-content-defaults'
                    )}
                    {...props}
                >
                    {children}
                </main>
                <SiteFooter />
                <ViewportSize />
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
