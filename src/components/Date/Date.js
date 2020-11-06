import React from 'react';

import styles from './Date.module.scss';

export default function Date({
    published,
    publishedISO,
    updated,
    updatedISO,
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
        </div>
    );
}
