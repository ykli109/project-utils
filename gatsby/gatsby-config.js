const path = require('path');

const TEMPLATE_NAME = 'default';

const remarkPlugins = [
    {resolve: 'gatsby-remark-codeset'},
    {
        resolve: 'gatsby-remark-code-buttons', // 代码块复制插件
        options: {
            tooltipText: isEn ? 'copy' : '复制',
            toasterText: isEn ? 'copied successful!' : '复制成功!',
        }
    },
    {resolve: 'gatsby-remark-internal-link',},
    {
        resolve: 'gatsby-remark-autolink-headers',
        options: {
            offsetY: 0 // 锚点高度
        }
    },
    {resolve: 'gatsby-remark-prismjs'}
];

const config = {
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'docs',
                path: path.join(__dirname, 'docs'),
                ignore: [path.join(__dirname, 'docs/*.json')]
            }
        },
        {
            resolve: 'gatsby-plugin-layout',
            options: {
                component: getLayout(TEMPLATE_NAME)
            }
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: _.compact(remarkPlugins)
            }
        },
        'gatsby-plugin-less',
        'gatsby-transformer-json',
        'gatsby-plugin-remove-serviceworker'
    ]
};

module.exports = config;
