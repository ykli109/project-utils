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

export const html2text = (html: string = '') => html.replace(htmlRegExp, s => (
    htmlTextMap.find(item => item.html === s).text
));

export const text2html = (text: string = '') => text.replace(textRegExp, s => (
    htmlTextMap.find(item => item.text === s).html
));

export default {
    html2text,
    text2html,
};
