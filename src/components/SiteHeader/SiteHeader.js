import React from 'react';
import classNames from 'classnames';
import {Link} from 'gatsby';

// import HeaderLink from './HeaderLink';
import {CollapsingTabs, Tab} from './CollapsingTabs';
import styles from './SiteHeader.module.scss';
import GithubLogoSvg from '../../images/github-octocat.svg';

const HeaderLink = ({isActive, title, to}) => (
    <Link to={to} className={classNames({[styles.active]: isActive})}>
        {title}
    </Link>
);

const SiteHeader = ({location, siteTitle}) => (
    <header className={classNames(styles.header, 'site-header')}>
        <nav>
            <div className={styles.title}>
                {location.pathname === '/' ? (
                    <h1>
                        <HeaderLink isActive={true} to="/" title={siteTitle} />
                    </h1>
                ) : (
                    <HeaderLink isActive={false} to="/" title={siteTitle} />
                )}
            </div>

            <CollapsingTabs>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/portfolio.html')}
                        to="/portfolio.html"
                        title="Portfolio"
                    />
                </Tab>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/resume.html')}
                        to="/resume.html"
                        title="Résumé"
                    />
                </Tab>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/contact.html')}
                        to="/contact.html"
                        title="Contact"
                    />
                </Tab>
                <Tab>
                    <a href="https://github.com/cmmartti">
                        Github
                        <GithubLogoSvg />
                    </a>
                </Tab>
                <Tab>
                    <HeaderLink
                        isActive={location.pathname.includes('/case-studies')}
                        to="/case-studies/"
                        title="Case Studies"
                    />
                </Tab>
            </CollapsingTabs>
        </nav>
    </header>
);

export default SiteHeader;
