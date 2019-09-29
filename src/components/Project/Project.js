import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';

import styles from './Project.module.scss';
import {useScroller} from '../useScroller';

export default function Project({title, htmlBody, images}) {
    const scrollerRef = useRef(null);
    const projectRef = useRef(null);

    const keys = images.map(image => image.src);
    const scroller = useScroller(scrollerRef, keys);

    /* Work around a bug by setting a fixed height on each child item. This bug:
       "intrinsic width of parent with overflow-x:scroll not computing correctly
       with child image with height:100%" at
       https://bugzilla.mozilla.org/show_bug.cgi?id=1281713
    */
    const [innerHeight, setInnerHeight] = useState(0);
    useLayoutEffect(() => {
        setInnerHeight(scrollerRef.current.clientHeight);
    });

    useEffect(() => {
        function handleKeypress(event) {
            if (projectRef.current.contains(event.target)) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    scroller.previous({loop: false});
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    scroller.next({loop: false});
                }
            }
        }
        window.addEventListener('keydown', handleKeypress);
        return () => window.removeEventListener('keydown', handleKeypress);
    }, [scroller]);

    return (
        <div
            className={styles.project}
            ref={projectRef}
            tabIndex={-1}
            onClick={e => e.target.focus()}
        >
            <div className={styles.content}>
                <div className={styles.text}>
                    <h3>{title}</h3>
                    <div dangerouslySetInnerHTML={{__html: htmlBody}} />
                </div>
                <div className={styles.gallery}>
                    <div className={styles.navButtonsContainer}>
                        <span className={styles.countLabel}>
                            {images.length} images
                        </span>
                        <button
                            className={styles.navButton}
                            disabled={scroller.status[0].visibility === 1}
                            onClick={() => scroller.previous()}
                            aria-label="Previous image"
                        >
                            ◄
                        </button>
                        <button
                            className={styles.navButton}
                            disabled={
                                scroller.status[scroller.status.length - 1]
                                    .visibility === 1
                            }
                            onClick={() => scroller.next()}
                            aria-label="Next image"
                        >
                            ►
                        </button>
                    </div>
                    <div className={styles.scroller} ref={scrollerRef}>
                        {images.map(image => (
                            <div
                                style={{height: innerHeight || '100%'}}
                                key={image.src}
                                onClick={() => scroller.scrollTo(image.src)}
                                className={styles.imageWrapper}
                            >
                                <img src={image.src} alt={image.alt} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{clear: 'both'}} />
            </div>
        </div>
    );
}

function Gallery({images}) {
    const scrollerRef = useRef(null);

    const keys = images.map(image => image.src);
    const scroller = useScroller(scrollerRef, keys);

    /* Work around a bug by setting a fixed height on each child item. This bug:
       "intrinsic width of parent with overflow-x:scroll not computing correctly
       with child image with height:100%" at
       https://bugzilla.mozilla.org/show_bug.cgi?id=1281713
    */
    const [innerHeight, setInnerHeight] = useState(0);
    useLayoutEffect(() => {
        setInnerHeight(scrollerRef.current.clientHeight);
    }, []);

    useEffect(() => {
        function handleKeypress(event) {
            if (scrollerRef.current.contains(event.target)) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    scroller.previous({loop: false});
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    scroller.next({loop: false});
                }
            }
        }
        window.addEventListener('keydown', handleKeypress);
        return () => window.removeEventListener('keydown', handleKeypress);
    }, [scroller]);

    return (
        <div className={styles.gallery}>
            <div className={styles.navButtonsContainer}>
                <span className={styles.countLabel}>
                    {images.length} images
                </span>
                <button
                    className={styles.navButton}
                    disabled={scroller.status[0].visibility === 1}
                    onClick={() => scroller.previous()}
                    aria-label="Previous image"
                >
                    ◄
                </button>
                <button
                    className={styles.navButton}
                    disabled={
                        scroller.status[scroller.status.length - 1]
                            .visibility === 1
                    }
                    onClick={() => scroller.next()}
                    aria-label="Next image"
                >
                    ►
                </button>
            </div>
            <div className={styles.scroller} ref={scrollerRef}>
                {images.map(image => (
                    <div
                        style={{height: innerHeight || '100%'}}
                        key={image.src}
                        onClick={() => scroller.scrollTo(image.src)}
                        className={styles.imageWrapper}
                    >
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
}
