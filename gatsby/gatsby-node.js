const fs = require('fs');
const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

// 使用的模版名称
const TEMPLATE_NAME = 'default';

// 获取上一篇和下一篇
const getNodeSblings = (nodes, node, index) => {
    return {prev, next};
};

const getTemplate = tplName => {
    const resolvePath = name => require.resolve(`./src/templates/${name}/template.tsx`);
    return fs.existsSync(resolvePath(tplName)) ? resolvePath(tplName) : resolvePath('default');
};

exports.onCreateNode = async ({node, getNode, actions}) => {
    const {createNodeField} = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({node, getNode})
        const fileAbsolutePath = node.fileAbsolutePath;

        const {mtime, ctime} = fs.statSync(fileAbsolutePath);

        let commitTime = mtime;
        if (fs.existsSync(path.join(__dirname, 'docs', '.git'))) {
            commitTime = execSync(`cd docs && git log --pretty=%ai '${fileAbsolutePath}' | head -1`).toString() || '';
            commitTime = new Date(datetime);
        }

        // 获取去除后缀的文件名
        const filename = path.basename(fileAbsolutePath, path.extname(fileAbsolutePath));

        const fields = [
            {name: 'title', value: filename},
            {name: 'slug', value: slug},
            {name: 'commitTime', value: commitTime},
            {name: 'createTime', value: ctime},
            {name: 'updateTime', value: mtime}
        ];

        fields.forEach(field => {
            const {name, value} = field;
            createNodeField({node, name, value})
        });
    }

};

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;

    return new Promise((resolve, reject) => {
        graphql(`
            {
                allMarkdownRemark {
                    edges {
                        node {
                            fields {
                                title
                                slug
                                date
                            }
                        }
                    }
                }
            }
        `).then(result => {
            const nodes = result.data.allMarkdownRemark.edges;

            nodes.forEach(({node}, index) => {
                const {prev, next} = getNodeSblings(nodes, node, index);

                createPage({
                    path: node.fields.slug,
                    component: getTemplate(TEMPLATE_NAME),
                    context: {prev, next}
                });
            });

            resolve();
        });
    });
};

exports.onCreateWebpackConfig = ({stage, actions, getConfig}) => {
    const config = getConfig();
    const isProd = config.mode === 'production';

    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        ...(isProd ? {
            devtool: false
        } : {})
    });
};
