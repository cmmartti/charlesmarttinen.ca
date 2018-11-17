import React from 'react';
import classNames from 'classnames';
import {Link} from 'gatsby';

import {CollapsingTabs, Tab} from './CollapsingTabs';
import styles from './SiteHeader.module.scss';
import GithubLogoSvg from '../../images/github-octocat.svg';

const HeaderLink = ({isActive, children, to, className, ...props}) => (
    <Link
        to={to}
        className={classNames(className, {[styles.active]: isActive})}
        {...props}
    >
        {children}
    </Link>
);

const SiteHeader = ({location, siteTitle}) => (
    <header className={classNames(styles.header, 'site-header')}>
        <nav>
            <div className={styles.title}>
                {location.pathname === '/' ? (
                    <h1>
                        <HeaderLink isActive={true} to="/">
                            {siteTitle}
                        </HeaderLink>
                    </h1>
                ) : (
                    <HeaderLink
                        isActive={false}
                        to="/"
                        title="Go back to the home page"
                    >
                        {siteTitle}
                    </HeaderLink>
                )}
            </div>

            <CollapsingTabs>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/projects.html')}
                        to="/projects.html"
                    >
                        Projects
                    </HeaderLink>
                </Tab>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/resume.html')}
                        to="/resume.html"
                    >
                        Résumé
                    </HeaderLink>
                </Tab>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/contact.html')}
                        to="/contact.html"
                    >
                        Contact Me
                    </HeaderLink>
                </Tab>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/case-studies')}
                        to="/case-studies/"
                    >
                        Case Studies
                    </HeaderLink>
                </Tab>
                <Tab>
                    <a href="https://github.com/cmmartti">
                        <GithubLogoSvg />
                        <span>Github</span>
                    </a>
                </Tab>
            </CollapsingTabs>
        </nav>
    </header>
);

export default SiteHeader;
