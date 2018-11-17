module.exports = {
    siteMetadata: {
        title: 'Charles Marttinen',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                includePaths: ['src/theme'],
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-react-svg',
        'gatsby-plugin-sharp',
        'gatsby-plugin-polyfill-io',
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Roboto:regular,bold,italic'],
                },
            },
        },

        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                htmlTitle: 'Site Editor',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages/case-studies/`,
                name: 'case-studies',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                        options: {icon: false},
                    },
                    {
                        resolve: 'gatsby-remark-prismjs',
                        options: {
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                        },
                    },
                ],
            },
        },
        'gatsby-plugin-catch-links',

        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Charles Marttinen',
                short_name: 'Charles Marttinen',
                start_url: '/',
                background_color: '#ffbf47',
                theme_color: '#176bbd',
                display: 'minimal-ui',
                icon: 'src/images/logo.svg', // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
    ],
};
