module.exports = {
    siteMetadata: {
        title: 'Charles Marttinen',
        siteUrl: 'https://charlesmarttinen.ca',
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/`,
                name: 'static',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/`,
                name: 'content',
            },
        },

        // Image resizing, etc.
        'gatsby-transformer-sharp',
        `gatsby-plugin-sharp`,

        {
            // Markdown transformations
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    // Allow images outside of src folder to be used in frontmatter while
                    // still being query-able from GraphQL (for auto-resizing, etc.)
                    'gatsby-remark-relative-images',

                    {
                        // Automatic resizing, etc. for images used in Markdown files
                        resolve: 'gatsby-remark-images',
                        options: {
                            withWebp: false,
                            showCaptions: true,
                            quality: 100,
                            maxWidth: 700,

                            // fluidResult options: https://github.com/gatsbyjs/gatsby/blob/27e4a6ac8996138c1e14a1848ec3ce3eed057c12/packages/gatsby-plugin-sharp/src/index.js#L496
                            // wrapperStyle: fluidResult =>
                            //     `width:${fluidResult.presentationWidth}px;`,
                            linkImagesToOriginal: true,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                        options: {icon: false},
                    },

                    {
                        // Code
                        resolve: 'gatsby-remark-prismjs',
                        options: {showLineNumbers: false},
                    },
                ],
            },
        },
        'gatsby-plugin-catch-links',

        {
            // RSS feed
            resolve: `gatsby-plugin-feed`,
            options: {
                // base query that will be merged with each feed query
                query: `
                    query {
                        site {
                            siteMetadata {
                                siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        output: '/rss.xml',

                        // feed options
                        setup: ({query}) => ({
                            title: "RSS Feed for Charles Marttinen's Writing",
                            description:
                                "Every once in a while, I'll pull out a notebook and pencil and write about something that interests me.",
                            site_url: query.site.siteMetadata.siteUrl,
                        }),

                        // feed items
                        serialize: ({query}) => {
                            return query.blogEntries.edges.map(edge => {
                                const {frontmatter, fields, html} = edge.node;
                                const url =
                                    query.site.siteMetadata.siteUrl +
                                    fields.path;
                                return {
                                    description: fields.excerptHtml,
                                    title: frontmatter.title,
                                    date: frontmatter.datePublished,
                                    url,
                                    guid: url,
                                    custom_elements: [
                                        {
                                            'content:encoded':
                                                html +
                                                `<hr /><p>This was originally posted on my website at <a href="${url}">${url}</a></p>`,
                                        },
                                    ],
                                };
                            });
                        },

                        // feed query
                        query: `
                            query {
                                blogEntries: allMarkdownRemark(
                                    sort: {
                                        order: DESC
                                        fields: [frontmatter___datePublished]
                                    }
                                    filter: {
                                        fileAbsolutePath: {regex: "/src/content/blog/"}
                                    }
                                ) {
                                    edges {
                                        node {
                                            html
                                            frontmatter {datePublished title tags}
                                            fields {excerptHtml path}
                                        }
                                    }
                                }
                            }
                        `,
                    },
                ],
            },
        },

        {
            resolve: 'gatsby-plugin-sass',
            options: {
                includePaths: ['src/'],
            },
        },
        'gatsby-plugin-react-svg',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-polyfill-io',
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Roboto:regular,bold,italic'],
                },
            },
        },
        // 'gatsby-plugin-netlify-cms',

        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Charles Marttinen',
                short_name: 'Charles Marttinen',
                start_url: '/',
                background_color: '#176bbd',
                theme_color: '#176bbd',
                display: 'minimal-ui',
                icon: 'src/assets/logo.svg',
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
    ],
};
