export const onPreRenderHTML = ({getHeadComponents, replaceHeadComponents}) => {
    if (process.env.NODE_ENV !== 'production') {
        return;
    }

    const headComponents = getHeadComponents();

    headComponents.forEach(el => {
        // css文件太大，就不以inline style的方式渲染了
        if (el.type === 'style' && el.props['data-href']) {
            el.type = 'link';
            el.props.href = el.props['data-href'];
            el.props.rel = 'stylesheet';
            el.props.type = 'text/css';

            delete el.props['data-href'];
            delete el.props.dangerouslySetInnerHTML;
        }
    });

    // react-helmet放在最前面
    headComponents.sort((a, b) => (b.props['data-react-helmet'] && !a.props['data-react-helmet'] ? 1 : 0));

    replaceHeadComponents(headComponents);
};
