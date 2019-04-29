import {useState, useRef, useEffect, useLayoutEffect} from 'react';
// import './array-from-polyfill';
// import './array-findindex-polyfill';

const isProduction = process.env.NODE_ENV === 'production';
function warning(message) {
    // no warnings in production
    if (isProduction) {
        return;
    }
    console.warn(`[useScroller] ${message}`);
}

function arrayCompare(array1, array2) {
    return (
        array1.length === array2.length &&
        array1.every((a, index) => a === array2[index])
    );
}

/*
    useScroller adds next/previous/scrollTo methods to a horizontally scrolling element.
    It allows for the creation of a flexible, accessible, and lightweight image gallery
    that doesn't re-invent existing browser functionality.

    Requirements:
    - IntersectionObserver
    - Smooth scrolling

    If targeted browsers do not support these, add the appropriate global polyfills.

    TODO:
     - Type-/click-ahead functionality for repeated calling of next/previous. Currently,
       calling next/previous repeatedly requires waiting for the browser to finish
       smooth scrolling.
     - Panorama support, or navigating within images wider than the scroller viewport.
     - Scroll-snapping? Native CSS scroll-snapping is not sufficient. I have no idea how
       I'd implement this though.
 */

export function useScroller(scrollerRef, keys) {
    const [status, setStatus] = useState(
        keys.map(key => ({key, visibility: 0, fill: 0}))
    );

    useLayoutEffect(() => {
        scrollerRef.current.style.position = 'relative';
    }, [scrollerRef]);

    // Use multiple IntersectionObservers to trigger an update when an item
    //  - intersects the root, or
    //  - intersects a 0px by 0px point in the middle of the root.
    //
    // When an update is triggered, record the status of each item.
    // This consists of two values between 0 and 1:
    //  - visibility -> how much of the item is visible in the root's viewport
    //  - fill -> how much of the root's viewport the item fills

    const observers = useRef([]);
    useEffect(() => {
        function handleIntersection(entries, {root}) {
            // Measure from the inside of any padding or borders on the scroller
            const leftInset = root.children[0].offsetLeft;

            const newItemState = Array.from(root.children).map(
                (target, index) => {
                    const targetLeft = target.offsetLeft - leftInset;

                    // Calculate the horizontal intersection
                    const visibleWidth = Math.max(
                        0,
                        Math.min(
                            root.scrollLeft + root.clientWidth,
                            targetLeft + target.offsetWidth
                        ) - Math.max(root.scrollLeft, targetLeft)
                    );

                    let fill = visibleWidth / root.clientWidth;
                    let visibility = visibleWidth / target.offsetWidth;

                    // Account for rounding(?) errors
                    if (visibleWidth + 10 > root.clientWidth) fill = 1;
                    if (visibleWidth + 10 > target.offsetWidth) visibility = 1;

                    return {
                        key: prevItemKeys.current[index],
                        fill,
                        visibility,
                    };
                }
            );
            setStatus(newItemState);
        }

        observers.current = [
            new IntersectionObserver(handleIntersection, {
                root: scrollerRef.current,
                rootMargin: '-50%', // creates a centred 0px by 0px bounding box
                threshold: [0],
            }),
            new IntersectionObserver(handleIntersection, {
                root: scrollerRef.current,
                threshold: [0, 0.02, 0.5, 0.95, 0.97, 0.99, 1],
            }),
        ];

        return function cleanUp() {
            observers.current.forEach(observer => observer.disconnect());
        };
    }, [scrollerRef]);

    const prevItemKeys = useRef([]);

    useEffect(() => {
        if (!arrayCompare(keys, prevItemKeys.current)) {
            Array.from(scrollerRef.current.children).forEach(item => {
                observers.current.forEach(observer => observer.observe(item));
            });
            prevItemKeys.current = keys;
        }

        if (new Set(keys).length !== scrollerRef.current.children.length) {
            warning(
                'Item keys must match scroller children. Check that you have correctly passed in an array of item keys to useScroller.'
            );
        }
    }, [keys, scrollerRef]);

    function scrollTo(key, options = {}) {
        const {
            // 'start', 'end', 'nearest' (start or end, whichever is nearest), 'centre',
            // or 'auto' (fit as many items as possible).
            fit = 'auto',

            // Make sure a bit of the next item shows. Measured in pixels.
            // Does not apply when fit=center.
            margin = 0,

            //
            // Only applicable to targets larger than the scroller
            leftOffset = 0,
        } = options;

        const scroller = scrollerRef.current;
        const index = prevItemKeys.current.findIndex(k => k === key);
        if (index < 0) {
            warning(`Item with key '${key}' does not exist.`);
            return;
        }
        const target = scroller.children[index];

        // Measure from the inside of any padding, borders, pseudo-elements, etc. on the scroller
        const leftInset = scroller.children[0].offsetLeft;

        // TODO: Actually measure the right inset, don't assume it's the same as the left
        const rightInset = leftInset;

        if (fit === 'start') {
            scroller.scrollTo({
                left: target.offsetLeft - leftInset - margin + leftOffset,
                behavior: 'smooth',
            });
        } else if (fit === 'end') {
            scroller.scrollTo({
                left:
                    target.offsetLeft +
                    rightInset -
                    scroller.offsetWidth +
                    target.offsetWidth +
                    margin,
                behavior: 'smooth',
            });
        } else if (fit === 'nearest') {
            // Compare the centrepoints of the item and the scroller
            if (
                target.offsetLeft - leftInset + target.offsetWidth / 2 <=
                scroller.scrollLeft + scroller.offsetWidth / 2
            ) {
                scrollTo(key, {...options, fit: 'start'});
            } else {
                scrollTo(key, {...options, fit: 'end'});
            }
        } else if (fit === 'center') {
            scroller.scrollTo({
                left:
                    target.offsetLeft -
                    (scroller.offsetWidth - target.offsetWidth) / 2,
                behavior: 'smooth',
            });
        } else if (fit === 'auto') {
            // Is the target ahead or behind the "current" items? This determines which
            // direction to try to fit images from first.
            let step = 1;
            status.forEach(({fill, visibility}, i) => {
                if (fill >= 0.5 || visibility === 1) {
                    if (index >= i) step = -1;
                }
            });

            // Look back and ahead to see if any other items will fit too
            const backWidth = getFitWidth(target.offsetWidth, step);
            const aheadWidth = getFitWidth(
                target.offsetWidth + backWidth,
                -step
            );

            const width = target.offsetWidth + backWidth + aheadWidth;
            const centreOffset = (scroller.offsetWidth - width) / 2;

            scroller.scrollTo({
                top: 0,
                left:
                    target.offsetLeft -
                    leftInset -
                    (step === 1 ? aheadWidth : backWidth) -
                    centreOffset,
                behavior: 'smooth',
            });
        }

        function getFitWidth(initialWidth, step) {
            let width = 0;
            while (true) {
                const adjacentElement = scroller.children[index + step];
                if (!adjacentElement) break;

                const adjacentWidth = adjacentElement.offsetWidth;
                if (
                    initialWidth + width + adjacentWidth <
                    scroller.offsetWidth -
                        // leftInset - rightInset -
                        margin * 2
                ) {
                    width += adjacentWidth;
                } else {
                    break;
                }
                step += step;
            }
            return width;
        }
    }

    function isFull({visibility, fill}) {
        return fill === 1 || visibility === 1;
    }
    function isPartial({fill, visibility}) {
        return visibility > 0 && fill < 1 && visibility < 1;
    }
    function next({loop = true, ...options} = {}) {
        // skip the last item
        for (let i = 0; i < status.length - 1; i++) {
            if (
                (isFull(status[i]) && !isFull(status[i + 1])) ||
                (isPartial(status[i]) && isPartial(status[i + 1]))
            ) {
                scrollTo(status[i + 1].key, options);
                return;
            }
        }
        if (loop) {
            scrollTo(status[0].key, options);
        }
    }
    function previous({loop = true, ...options} = {}) {
        // skip the first item
        for (let i = 1; i < status.length; i++) {
            if (
                (!isFull(status[i - 1]) && isFull(status[i])) ||
                (isPartial(status[i - 1]) && isPartial(status[i]))
            ) {
                scrollTo(status[i - 1].key, options);
                return;
            }
        }
        if (loop) {
            scrollTo(status[status.length - 1].key, options);
        }
    }

    return {
        next,
        previous,
        scrollTo,
        status,
    };
}
