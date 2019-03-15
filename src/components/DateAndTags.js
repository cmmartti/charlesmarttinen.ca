import React from 'react';
import {Link} from 'gatsby';
import {css} from 'emotion';

import styles from './DateAndTags.module.scss';

export default function DateAndTags({
    published,
    publishedISO,
    updated,
    updatedISO,
    tags,
}) {
    return (
        <div className={styles.details}>
            <time dateTime={publishedISO} className={styles.date}>
                {published}
            </time>
            {publishedISO !== updatedISO && (
                <span className={styles.date}>
                    Updated <time dateTime={updatedISO}>{updated}</time>
                </span>
            )}
            {tags.length > 0 && (
                <span>
                    {tags.map(tag => (
                        <React.Fragment key={tag}>
                            {' '}
                            <Link
                                className="underline-on-hover"
                                style={{fontSize: '0.9em'}}
                                to={`/blog/tags/${tag}.html`}
                            >
                                [{tag}]
                            </Link>
                        </React.Fragment>
                    ))}
                </span>
            )}
        </div>
    );
}
