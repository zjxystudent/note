# 功能
生成二维码
# 使用
用法1：
```html
<div id="qrcode"></div>
<script type="text/javascript">
    new QRCode(document.getElementById("qrcode"), "http://www.runoob.com");
    //要生成二维码的链接
</script>
```
用法2：
```html
<div id="qrcode"></div>
<script type="text/javascript">
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "http://jindo.dev.naver.com/collie",
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
</script>
```
用法3：
```js
qrcode.makeCode(" https://github.com/davidshimjs/qrcodejs"); //要生成二维码的链接
```
用法4(vue3)：
```ts
const canvasRef = ref()
function printQRCode(content: string) {
  QRCode.toCanvas(
    canvasRef.value,
    content,
    { margin: 0, width: 800, errorCorrectionLevel: 'L' },
    function (error) {
      if (error) {
        console.error(error)
      } else {
        console.log('success!')
      }
    }
  )
}
```

# 纠错等级
二维码容错率即是指二维码图标被遮挡多少后，仍可以被扫描出来的能力。容错率越高，则二维码图片能被遮挡的部分越多。

容错的原理是二维码在编码过程中进行了冗余，就像是123被编码成123123，这样只要扫描到一部分二维码图片，二维码内容还是可以被全部读到。

大多数情况下，我们强烈建议采用30%的容错率（对目前主流手机，在绝大多数扫描场景下，容错率越高，越容易被快速扫描!!!）

correctLevel : QRErrorCorrectLevel.L, （7%）

correctLevel : QRErrorCorrectLevel.M, （15%）

correctLevel : QRErrorCorrectLevel.Q, （25%）

correctLevel : QRErrorCorrectLevel.H, （30%）

