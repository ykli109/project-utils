<!--
 * @file: html <-> 文本显示
 * @author: yili109@outlook.com
-->

## html工具函数
- html2text: 将html转化为文本形式。 
- text2html: 将文本转化为html形式。
- removeStyle: 讲html中的inline-style属性删除
```
html2text(`<li><a id="skip-main" href="#content">Skip to main content</a></li>`);
// 输出：&lt;li&gt;&lt;a&nbsp;id&#x3D;&quot;skip-main&quot;&nbsp;href&#x3D;&quot;#content&quot;&gt;Skip&nbsp;to&nbsp;main&nbsp;content&lt;&#x2F;a&gt;&lt;&#x2F;li&gt;

text2html(`&lt;li&gt;&lt;a&nbsp;id&#x3D;&quot;skip-main&quot;&nbsp;href&#x3D;&quot;#content&quot;&gt;Skip&nbsp;to&nbsp;main&nbsp;content&lt;&#x2F;a&gt;&lt;&#x2F;li&gt;`);
// 输出：<li><a id="skip-main" href="#content">Skip to main content</a></li>

removeStyle('<div style="width:100px">dv1</div><p style="font-size:14px">pragraph</p>', ['p']);
// 输出：<div >dv1</div><p style="font-size:14px">pragraph</p>

removeStyle('<div style="width:100px">dv1</div><p style="font-size:14px">pragraph</p>');
// 输出：<div >dv1</div><p >pragraph</p>
```
