---
order: 1
title: Pokémon Finder
date: '2019-03-25'
images:
    - src: /images/pokemon-finder.png
      alt: ''
      title: ''
    - src: /images/pokemon-finder-mobile.png
      alt: ''
      title: ''
---

**[Live demo](https://pokemon-finder.netlify.com) • [Source code](https://github.com/cmmartti/pokemon-finder)**

A fully-developed proof of concept for a dynamic browser-based reporting application, for analysing data from the popular video game _Pokémon_. Built with React using a GraphQL API based on the open source [PokéAPI](https://pokeapi.co) project.

This project demonstrates end-to-end understanding of the development process, including:

-   **API design and development:** A full-featured, future proof GraphQL API in Python and Django that interfaces with a relational database and makes use of the [DataLoader](https://github.com/graphql/dataloader) technique to consolidate database queries.
-   **UX design:** A user experience that emphasises ease-of-use but still allows for advanced capabilities. Clearly divorcing the input from the output contains the interactivity to a single location, and displaying the current filter as a sentence prevents the current state of the report from getting lost in a sea of controls.
-   **UI design:** A cohesive page design and consistent colour palette guides the user's attention and smoothly scales between large and small screens. Advanced input controls work equally well on their own or inline as part of a sentence, and the compact table design avoids scroll fatigue (note the staggered images which push into the adjacent rows, cutting the height of the table in half).
-   **Single page client application:** The user interface is built using React in a performant and forward-thinking manner, using the Redux pattern to manage global state (with judicious use of local component state where appropriate) and Apollo to make GraphQL requests. The current page state is synched with the URL for easy bookmarking and sharing, and preferences are saved to LocalStorage. Please take a look at the [source code](https://github.com/cmartti/pokemon-finder) if you're interested.
-   **Custom input components:** Accessible input components were built in JavaScript and React with custom CSS, including drag-and-drop interfaces, menus, and type-ahead search fields that appropriately manage keyboard and mouse events and use the correct [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).
-   **Server deployment:** Serving the GraphQL API from a Digital Ocean droplet with a production-ready Docker Compose environment and HTTPS encryption with Let's Encrypt.
-   **Git:** Regular, discrete commits with (usually) well-crafted commit messages.

**[Go to the live application →](https://pokemon-finder.netlify.com)**

Note: I've received reports that Pokémon Finder may not work on iOS devices. Once I get a testing device, I will try to fix the bug.
