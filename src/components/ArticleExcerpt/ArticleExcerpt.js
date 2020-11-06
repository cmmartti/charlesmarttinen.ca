import React from 'react';
import {Link} from 'gatsby';

import Date from '../Date';
import styles from './ArticleExcerpt.module.scss';

export default function ArticleExcerpt({
    title,
    dates,
    image,
    excerptHtml,
    bodyHtml,
    path,
}) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>
                <Link className="underline-on-hover" to={path}>
                    {title}
                </Link>
            </h2>
            <Date {...dates} />
            {image && (
                <Link to={path} aria-hidden tabIndex="-1">
                    <img src={image} alt="" className={styles.thumb} />
                </Link>
            )}
            <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{__html: excerptHtml || bodyHtml}}
            />
            <p>
                <Link to={path}>
                    {excerptHtml ? 'Read more...' : 'Perma-link'}
                </Link>
            </p>
            <div style={{clear: 'both'}} />
        </section>
    );
}
