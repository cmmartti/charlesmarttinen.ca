import React from 'react';
import classNames from 'classnames';
import {Link} from 'gatsby';

import DynamicTabs from './DynamicTabs';
import styles from './Navigation.module.scss';
import GithubLogoSvg from '../assets/github-octocat.svg';

function Tab({isActive = false, isTitle = false, children}) {
    return (
        <div
            className={classNames({
                [styles.tab]: true,
                [styles.active]: isActive,
                [styles.title]: isTitle,
            })}
            aria-current={isActive ? 'page' : 'false'}
        >
            {children}
        </div>
    );
}

export default function Navigation({location, siteTitle, flip = false}) {
    return (
        <nav className={classNames(styles.navbar, {[styles.flip]: flip})}>
            <DynamicTabs classNamePrefix={styles.navbar}>
                <Tab isActive={location.pathname === '/'} isTitle={true}>
                    {location.pathname === '/' ? (
                        <h1>
                            <Link to="/">{siteTitle}</Link>
                        </h1>
                    ) : (
                        <Link to="/" title="Go back to the home page">
                            {siteTitle}
                        </Link>
                    )}
                </Tab>

                <Tab isActive={location.pathname.includes('/resume.html')}>
                    <Link to="/resume.html">Résumé</Link>
                </Tab>
                <Tab isActive={location.pathname.includes('/contact.html')}>
                    <Link to="/contact.html">Contact</Link>
                </Tab>
                <Tab isActive={location.pathname.includes('/blog')}>
                    <Link to="/blog/">Writing</Link>
                </Tab>
                <Tab>
                    <a href="https://github.com/cmmartti">
                        <GithubLogoSvg />
                        <span>Github</span>
                    </a>
                </Tab>
            </DynamicTabs>
        </nav>
    );
}
