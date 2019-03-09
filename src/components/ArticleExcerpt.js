import React from 'react';
import {Link} from 'gatsby';

import DateAndTags from './DateAndTags';
import styles from './ArticleExcerpt.module.scss';

function ArticleExcerpt({
    title,
    dates,
    tags,
    image,
    excerptHtml,
    bodyHtml,
    path,
}) {
    return (
        <section className={styles.excerpt}>
            <div className={styles.main}>
                <h2 className={styles.title}>
                    <Link to={path}>{title}</Link>
                </h2>
                <DateAndTags {...dates} tags={tags} />
                <div className="typography">
                    {excerptHtml ? (
                        <>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: excerptHtml,
                                }}
                            />
                            <p>
                                <Link to={path}>Read more...</Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <div dangerouslySetInnerHTML={{__html: bodyHtml}} />
                            <p>
                                <Link to={path}>Perma-link</Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.image}>
                <Link to={path} aria-hidden tabIndex="-1">
                    {image && <img src={image} alt="" />}
                </Link>
            </div>
        </section>
    );
}

export default ArticleExcerpt;
