const path = require('path');

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;

    const caseStudyTemplate = path.resolve(
        'src/templates/CaseStudyTemplate.js'
    );
    const tagTemplate = path.resolve('src/templates/tags.js');

    return graphql(`
        {
            allMarkdownRemark(
                sort: {order: DESC, fields: [frontmatter___date]}
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            filename
                            date
                            tags
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        const edges = result.data.allMarkdownRemark.edges;

        // Posts pages
        edges.forEach(edge => {
            const {filename} = edge.node.frontmatter;
            createPage({
                path: `/case-studies/${filename}`,
                component: caseStudyTemplate,
                context: {filename},
            });
        });

        // Tags pages
        let tags = new Set();
        edges.forEach(edge => {
            edge.node.frontmatter.tags.forEach(tag => tags.add(tag));
        });
        tags.forEach(tag => {
            createPage({
                path: `/case-studies/tags/${tag}/`,
                component: tagTemplate,
                context: {tag},
            });
        });
    });
};
