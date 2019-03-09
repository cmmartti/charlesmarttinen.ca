import React from 'react';
import {Link} from 'gatsby';

import styles from './DateAndTags.module.scss';

const DateAndTags = ({published, publishedISO, updated, updatedISO, tags}) => {
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
            <span>
                {tags.map(tag => (
                    <React.Fragment key={tag}>
                        <Link
                            className={styles.tag}
                            to={`blog/tags/${tag}.html`}
                        >
                            {tag}
                        </Link>{' '}
                    </React.Fragment>
                ))}
            </span>
        </div>
    );
};

export default DateAndTags;
