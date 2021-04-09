<!--
 * @file: 在浏览器标签栏提示信息
 * @author: yili109@outlook.com
-->

## 在浏览器标签栏提示信息

```
// 页欠tab提示'...有新的消息...'
const clean = titleMsg('有新的消息');

// 1分钟，关闭提示，回复之前title
setTimeout(() => clean()), 60 * 1000);
```
