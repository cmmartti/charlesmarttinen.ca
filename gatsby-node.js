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
            value: `/blog/${node.frontmatter.slug}.html`,
        });

        // Make the HTML excerpt available from the fields field:
        // query {allMarkdownRemark {edges {node {fields {excerptHtml}}}}}
        const {excerpt} = node.frontmatter;
        let value = null;
        if (excerpt !== null && excerpt !== '' && excerpt !== '\n') {
            value = remark()
                .use(remarkHTML)
                .processSync(excerpt)
                .toString();
        }
        actions.createNodeField({
            node,
            name: 'excerptHtml',
            value: value,
        });
    }
};

exports.createPages = async ({actions, graphql}) => {
    const {createPage} = actions;

    const {errors, data} = await graphql(`
        {
            blogEntries: allMarkdownRemark(
                sort: {order: DESC, fields: [frontmatter___datePublished]}
                filter: {fileAbsolutePath: {regex: "//src/content/blog//"}}
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
    if (errors) {
        return Promise.reject(errors);
    }

    // Posts pages
    const posts = data.blogEntries.edges;
    posts.forEach((post, i) => {
        createPage({
            path: post.node.fields.path,
            component: path.resolve('src/templates/BlogEntry.js'),
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
            path: `/blog/tags/${tag}.html`,
            component: path.resolve('src/templates/TagPage.js'),
            context: {tag},
        });
    });
};
