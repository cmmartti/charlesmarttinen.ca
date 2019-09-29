import React from 'react';
import Helmet from 'react-helmet';
import {useStaticQuery, graphql} from 'gatsby';
import 'sanitize.css';
import classNames from 'classnames';
import 'focus-visible/dist/focus-visible.min.js';

import Navigation from '../Navigation';
// import ViewportSize from '../ViewportSize';
import './Layout.global.scss';

export default function Layout({
    children,
    location,
    className,
    title,
    ...props
}) {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );
    const siteTitle = data.site.siteMetadata.title;
    return (
        <>
            <Helmet
                title={title ? `${title} - ${siteTitle}` : siteTitle}
                // meta={[
                //     {name: 'description', content: 'Sample'},
                //     {name: 'keywords', content: 'sample, something'},
                // ]}
            >
                <html lang="en" />
            </Helmet>

            <header className="site-header">
                <Navigation siteTitle={siteTitle} location={location} />
            </header>
            <main className={classNames('site-content', className)} {...props}>
                {children}
            </main>
            <footer className="site-footer">
                <Navigation siteTitle={siteTitle} location={location} flip />
            </footer>

            {/* <ViewportSize /> */}
        </>
    );
}
