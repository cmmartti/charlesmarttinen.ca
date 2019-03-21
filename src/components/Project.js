import React from 'react';
import ImageScroller from 'react-image-scroller'; // made by me!

import styles from './Project.module.scss';

export default function Project({title, htmlBody, images}) {
    return (
        <div className={styles.project}>
            <div className={styles.description + ' typography'}>
                <h3>{title}</h3>
                <div dangerouslySetInnerHTML={{__html: htmlBody}} />
            </div>
            <ImageScroller
                className={styles.imageScroller}
                components={{IndexButtonsContainer: () => null}}
            >
                {images.map(image => (
                    <img key={image.src} src={image.src} alt={image.alt} />
                ))}
            </ImageScroller>
        </div>
    );
}
