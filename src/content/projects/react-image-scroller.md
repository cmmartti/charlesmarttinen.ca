---
title: React Image Scroller
order: 2
date: '2018-12-12'
images:
  - alt: 'A large, snow-covered, 10 foot fir tree beneath a canopy of spruce trees.'
    src: /images/snowy-tree.png
  - alt: 'A well-trod path through a sunny, lush green meadow.'
    src: /images/path.jpg
    title: ''
  - alt: >-
      A close-up photo of a Brown Knapweed flower (pink, with many small
      petals).
    src: /images/flower.jpg
  - alt: Shale beach sunset.
    src: /images/shale-beach-sunset.jpg
---
(This one, here →, or here ↓)

A scrolling image gallery for React. Unlike every other image gallery, this one is designed to show multiple images at once, without cropping them. It is not designed to be a cinematic experience, but rather an alternative to splashing a bunch of images on screen directly.

Each sub component is independently customisable and replaceable, and adding your own styles is easy. (This approach inspired by [React-Select](https://react-select.com/).

<details>
<summary>Technologies used</summary>

 - [React](https://reactjs.org/)
 - CSS-in-JS styles with [Emotion](https://emotion.sh/)
 - Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) for scrolling interactions
 - Custom Webpack setup

</details>

Published on npm as [react-image-scroller](https://www.npmjs.com/package/react-image-scroller). The source code is available on [GitHub](https://github.com/cmmartti/react-image-scroller).
