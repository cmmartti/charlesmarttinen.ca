import React from 'react';
import {Link} from 'gatsby';
import {css} from 'emotion';

import DateAndTags from './DateAndTags';

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
        <section
            className={css`
                display: flex;
                padding: 1em;
                margin: 1em 0;
                width: 100%;
                background-color: white;
                @media (max-width: 55em) {
                    display: block;
                }
            `}
        >
            <div
                className={css`
                    flex: 0 0;
                    order: 1;
                    max-width: 20em;
                    max-height: 20em;
                    min-width: 20em;
                `}
            >
                <Link to={path} aria-hidden tabIndex="-1">
                    {image && (
                        <img
                            src={image}
                            alt=""
                            className={css`
                                max-height: 100%;
                                max-width: 100%;
                                min-height: 10em;
                                height: 100%;
                                width: 100%;
                                object-fit: cover;
                                object-position: center center;
                                border: 1px solid #ccc;
                            `}
                        />
                    )}
                </Link>
            </div>

            <div
                className={css`
                    margin-right: 2em;
                    flex: 1;
                `}
            >
                <h2
                    className={css`
                        line-height: 1.2;
                    `}
                >
                    <Link to={path}>{title}</Link>
                </h2>
                <DateAndTags {...dates} tags={tags} />
                <div className="typography">
                    {excerptHtml ? (
                        <>
                            <div
                                dangerouslySetInnerHTML={{__html: excerptHtml}}
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
        </section>
    );
}

export default ArticleExcerpt;
