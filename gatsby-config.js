module.exports = {
    siteMetadata: {
        title: 'Charles Marttinen',
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
        'gatsby-transformer-sharp',
        `gatsby-plugin-sharp`,
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {},
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            withWebp: true,
                            showCaptions: true,
                            quality: 100,
                            wrapperStyle: '',
                            linkImagesToOriginal: true,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                        options: {icon: false},
                    },
                    {
                        resolve: 'gatsby-remark-prismjs',
                        options: {showLineNumbers: true},
                    },
                ],
            },
        },
        'gatsby-plugin-catch-links',

        {
            resolve: 'gatsby-plugin-sass',
            options: {
                includePaths: ['src/theme'],
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
        'gatsby-plugin-netlify-cms',
        {
            resolve: 'gatsby-plugin-emotion',
            option: {
                sourceMap: true,
                autoLabel: true,
                labelFormat: '[filename]--[local]',
            },
        },

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
