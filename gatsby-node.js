const path = require('path');
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.onCreateNode = ({node, actions, getNode}) => {
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
            },
        });
    });
};
