import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';

import styles from './SiteFooter.module.scss';

const SiteFooter = () => (
    <footer className={classNames('site-footer', styles.footer)}>
        <p>
            <Link to="contact.html">Contact Me</Link>
        </p>
        <p>Website © 2018 Charles Marttinen</p>
    </footer>
);

export default SiteFooter;
