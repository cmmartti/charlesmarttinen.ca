import React from 'react';
import {Link} from 'gatsby';

import styles from './SiteHeader.module.scss';

const HeaderLink = props => <Link activeClassName="active" exact {...props} />;

const Header = ({siteTitle}) => (
    <div>
        <div>
            <h1 style={{margin: 0}}>
                <h1 className="site-title">
                    <HeaderLink to="/">{siteTitle}</HeaderLink>
                </h1>

                <HeaderLink to="/portfolio">Portfolio</HeaderLink>
                <HeaderLink to="/resume">Résumé</HeaderLink>
                <HeaderLink to="/contact">Contact</HeaderLink>
                <a href="https://github.com/cmmartti">Github</a>
            </h1>
        </div>
    </div>
);

export default Header;
