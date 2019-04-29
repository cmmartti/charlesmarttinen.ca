---
title: React Image Scroller
order: 3
date: '2018-12-12'
images:
    - src: /images/snowy-tree.png
      alt: 'A large, snow-covered, 10 foot fir tree beneath a canopy of spruce trees.'
    - src: /images/flower.jpg
      alt: A close-up photo of a Brown Knapweed flower (pink, with many small
          petals).
    - src: /images/path.jpg
      alt: 'A well-trod path through a sunny, lush green meadow.'
---

**[Live demo](https://cmmartti.github.io/react-image-scroller/) • [Source code](https://github.com/cmartti/react-image-scroller)**

Used on this page, a scrolling image gallery component for React. Unlike every other image gallery, this one is designed to show multiple images at once, without cropping them. It is not designed to be a cinematic experience, but an alternative to splashing a bunch of images on screen directly.

<details><summary>Implementation Details</summary>

-   <a href="https://reactjs.org/">React</a>
-   CSS-in-JS styles with <a href="https://emotion.sh/">Emotion</a>
-   Uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">IntersectionObserver</a> for scrolling interactions
-   Custom Webpack setup
-   Each sub-component is independently replaceable and styleable

</details>

Published on npm as [react-image-scroller](https://www.npmjs.com/package/react-image-scroller).
