import React from 'react';
import {Link} from 'gatsby';

import DateAndTags from '../DateAndTags';
import styles from './ArticleExcerpt.module.scss';

export default function ArticleExcerpt({
    title,
    dates,
    tags,
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
            <DateAndTags {...dates} tags={tags} />
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
