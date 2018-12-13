const path = require('path');
const {fmImagesToRelative} = require('gatsby-remark-relative-images');
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.onCreateNode = ({node, actions, getNode}) => {
    fmImagesToRelative(node);

    if (node.internal.type === 'MarkdownRemark') {
        actions.createNodeField({
            node,
            name: 'path',
            value: `/case-studies/${node.frontmatter.slug}.html`,
        });

        // Make the HTML excerpt available from the fields field:
        // query {allMarkdownRemark {edges {node {fields {excerpt}}}}}
        const {excerpt} = node.frontmatter;
        let value = null;
        if (excerpt !== null && excerpt !== '' && excerpt !== '\n') {
            value = remark()
                .use(remarkHTML)
                .processSync(excerpt)
                .toString();
        }
        actions.createNodeField({
            node: node,
            name: 'excerpt',
            value: value,
        });
    }
};

exports.createPages = async ({actions, graphql}) => {
    const {createPage} = actions;

    // Home page
    createPage({
        path: '/',
        component: path.resolve('src/templates/HomePage.js'),
    });

    // Résume page
    createPage({
        path: '/resume.html',
        component: path.resolve('src/templates/Resume.js'),
    });

    // Get a list of all case studies
    const result = await graphql(`
        {
            caseStudies: allMarkdownRemark(
                sort: {order: DESC, fields: [frontmatter___datePublished]}
                filter: {
                    fileAbsolutePath: {regex: "//src/content/case-studies//"}
                }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            slug
                            tags
                        }
                        fields {
                            path
                        }
                    }
                }
            }
        }
    `);
    if (result.errors) {
        return Promise.reject(result.errors);
    }

    // Posts pages
    const posts = result.data.caseStudies.edges;
    posts.forEach((post, i) => {
        createPage({
            path: post.node.fields.path,
            component: path.resolve('src/templates/CaseStudy.js'),
            context: {
                previous:
                    i === posts.length - 1
                        ? null
                        : posts[i + 1].node.fields.path,
                next: i === 0 ? null : posts[i - 1].node.fields.path,
                tags: post.node.frontmatter.tags,
            },
        });
    });

    // Tags pages
    let tags = new Set();
    posts.forEach(post => {
        post.node.frontmatter.tags.forEach(tag => tags.add(tag));
    });
    tags.forEach(tag => {
        createPage({
            path: `/case-studies/tags/${tag}.html`,
            component: path.resolve('src/templates/TagsPage.js'),
            context: {tag},
        });
    });
};
