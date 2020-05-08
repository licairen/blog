### Unity与web通信

##### unity向web传值
```
> 目前unity传值只支持字符串，所以前端这边需要解析(JSON.parse(arg1))
window.UnityCallHtml = function( arg1 ) {
    console.log(JSON.parse(arg1))
}
```
##### web向unity传值
```
function HtmlCallUnity(arg) {}
window.HtmlCallUnity({...arg})
```


``` javascript
在网页中交互unity3d https://blog.csdn.net/manito_y/article/details/17138177

Unity 网络播放器 (Web Player) 和浏览器通信: http://docs.manew.com/Manual/UnityWebPlayerandbrowsercommunication.html
unity3D与网页的交互---做项目的一点总结 https://www.cnblogs.com/mygirl/archive/2011/04/02/2003116.html

Unity3D与网页数据交互的基本原理  https://www.geek-share.com/detail/2616564958.html

unity3d web交互  http://unity3d.lofter.com/post/9dd8e_567cb63
```
