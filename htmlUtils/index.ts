/**
* @file html2text 和 text2html
* @author liyunkun(yili109@outlook.com)
*/

const htmlTextMap = [
    {html: '&', text: '&amp;'},
    {html: '<', text: '&lt;'},
    {html: '>', text: '&gt;'},
    {html: '"', text: '&quot;'},
    {html: '\'', text: '&#39;'},
    {html: '`', text: '&#x60;'},
    {html: '/', text: '&#x2F;'},
    {html: '/', text: '&#x2f;'},
    {html: '=', text: '&#x3D;'},
    {html: '=', text: '&#x3d;'},
    {html: ' ', text: '&nbsp;'}
];

const htmlRegExp = new RegExp(htmlTextMap.map(item => item.html).join('|'), 'g');
const textRegExp = new RegExp(htmlTextMap.map(item => item.text).join('|'), 'g');

// 将html转译为纯文本展示
export const html2text = (html: string = '') => html.replace(htmlRegExp, s => (
    htmlTextMap.find(item => item.html === s).text
));

// 将纯文本形式的内容转为html
export const text2html = (text: string = '') => text.replace(textRegExp, s => (
    htmlTextMap.find(item => item.text === s).html
));

// 除去html元素的inline-style，可以排除一些标签
export const removeStyle = (html: string, exceptTags: string[] = []) => {
    // 匹配inline style样式字符串，例`<div style="display:none"></div>`
    const styleReg = /<[^<>]*(style ?= ?"[^"]*")[^<>]*>/g;

    // 匹配排除在外的标签 <table ...>...</table> | < img ... /> | < img ...>...</img>
    const exceptTagPatterns = exceptTags.map(item => `<${item}[^<>/]*>[^<>]*</${item}>|<${item}[^<>*]/>`);
    const exceptTagPattern = new RegExp(exceptTagPatterns.join('|'), 'g');

    // 将所有匹配到的排除在外的标签保存下来，同时记录位置
    const exceptStrs = [];
    let exceptExecResult;
    while (exceptExecResult = exceptTagPattern.exec(html)) {
        exceptStrs.push({
            exectStr: exceptExecResult[0],
            start: exceptExecResult.index,
            end: exceptExecResult.index + exceptExecResult[0].length,
        });
    }

    // 将所有匹配到的inline style记录下来，并记录起始位置
    const styleStrs = [];
    let regExecResult;
    while (regExecResult = styleReg.exec(html)) {
        styleStrs.push({
            styleStr: regExecResult[1],
            start: regExecResult.index,
            end: regExecResult.index + regExecResult[0].length,
        });
    }

    let result = html;
    styleStrs.forEach(str => {
        const {start, end, styleStr} = str;

        // 判断inline style是否处于需要排除的标签内，在的话不作处理
        if (exceptStrs.find(item => item.start <= start && item.end >= end)) {
            return;
        }

        // 不在的话，找到当前result中的当前位置，从这个位置开始替换
        const index = result.indexOf(html.slice(start));
        result = result.slice(0, index) + result.slice(index).replace(styleStr, '');
    });

    // 就怕有些人在标签里写好几个style属性，所以递归处理一下
    if (result === html) {
        return result;
    }

    return removeStyle(result, exceptTags);
}
