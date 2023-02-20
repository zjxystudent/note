如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在 HTML `<noscript>` 元素中定义脚本未被执行时的替代内容。

当脚本被禁用并且它是 `<head>`元素的后代时：以下顺序任意，零个或者多个`<link>`元素，零个或者多个`<style>`元素，零个或者多个`<meta>`元素。

当脚本被禁用并且它不是 `<head>` 元素的子元素时：任何 transparent content 都可以，但是在它的后代中必须没有 `<noscript>`元素。

否则：flow content 或 phrasing content。