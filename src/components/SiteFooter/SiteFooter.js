import React from 'react';
import {Link} from 'gatsby';

import styles from './SiteFooter.module.scss';

const SiteFooter = () => (
    <footer className={styles.footer + ' site-footer'}>
        <p>
            <Link to="contact.html">Contact Me</Link>
        </p>
        <p>Website © 2018 Charles Marttinen</p>
    </footer>
);

export default SiteFooter;
