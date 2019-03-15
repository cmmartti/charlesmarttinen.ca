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
                background-color: white;
                border: 1px solid #ccd3db;
                margin: 0.75em 0;
                padding: var(--content-padding);

                /* Child element has partial margin-bottom (because of the margin on
                    the floated image). */
                padding-bottom: calc(var(--content-padding) - 0.5em);
            ` + ' typography'}
        >
            <h2 style={{lineHeight: 1.2, margin: 0}}>
                <Link className="underline-on-hover" to={path}>
                    {title}
                </Link>
            </h2>
            <DateAndTags {...dates} tags={tags} />
            {image && (
                <Link to={path} aria-hidden tabIndex="-1">
                    <img
                        src={image}
                        alt=""
                        className={css`
                            margin: 0.25em 0 0.5em 0.75em;
                            float: right;
                            width: 10em;
                            height: 10em;
                            object-fit: cover;
                            max-width: 100%;
                            border: 1px solid #ccc;

                            @media (max-width: 20em) {
                                float: none;
                                margin-left: 0;
                            }
                        `}
                    />
                </Link>
            )}
            <div
                style={{flex: '1'}}
                dangerouslySetInnerHTML={{__html: excerptHtml || bodyHtml}}
            />
            <p>
                <Link className="underline-on-hover" to={path}>
                    {excerptHtml ? 'Read more...' : 'Perma-link'}
                </Link>
            </p>
            <div style={{clear: 'both'}} />
        </section>
    );
}

export default ArticleExcerpt;
