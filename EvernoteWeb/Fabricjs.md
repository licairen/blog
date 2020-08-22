<!--
 * @Author       : 李才人
 * @Date         : 2020-08-21 16:03:27
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-22 21:05:53
 * @FilePath     : /blog/EvernoteWeb/Fabricjs.md
-->

```javascript
> line 
let line1 = new fabric.Line([lineleft, lineheight, lineleft, 0],
{
        //终止位置，线长，起始位置，top，这里是从项目中截下来的我用了变量代替，你要用的话 lineheight 和 lineleft 用自己的变量或者数字代替。如果两个终止位置和起始位置的数值一样那么这个线条会垂直，这个应该很好理解。 
        fill: '#5E2300',//填充颜色 
        stroke: '#5E2300',//笔触颜色 
        strokeWidth: 2,//笔触宽度 
        strokeDashArray: [5, 5], // 虚线设置
        hasControls: false, //选中时是否可以放大缩小 
        hasRotatingPoint: false,//选中时是否可以旋转 
        hasBorders:false,//选中时是否有边框 
        transparentCorners:true, 
        perPixelTargetFind:true,//默认 false。当设置为 true，对象的检测会以像互点为基础，而不是以边界的盒模型为基础。 
        selectable:true,//是否可被选中 
        lockMovementX: true,//X 轴是否可被移动(true 为不可，因为前缀是 lock) 
        lockMovementY: true,//Y 轴是否可被移动(true 为不可，因为前缀是 lock) });
      }

```
```javascript
// Do some initializing stuff
// Do some initializing stuff
fabric.Object.prototype.set({
  transparentCorners: false,
  cornerColor: 'rgba(102,153,255,0.5)',
  cornerSize: 12,
  padding: 5
});

// initialize fabric canvas and assign to global windows object for debug
var canvas = window._canvas = new fabric.Canvas('c');


var circle2 = new fabric.Circle({
  radius: 100,
  fill: '#eef',
  scaleY: 0.5,
  originX: 'center',
  originY: 'center'
});

var text = new fabric.Text('潜水泵监控系统', {
  fontSize: 18,
  originX: 'center',
  originY: 'center'
});

var group = new fabric.Group([circle2, text], {
  left: 350,
  top: 200,
  angle: 0
});



canvas.add(
   group
);

rect = new fabric.Rect({
  top : 450, //距离画布上边的距离
  left : 250, //距离画布左侧的距离，单位是像素
  width : 50, //矩形的宽度
  height : 50, //矩形的高度
  fill : 'red', //填充的颜色
  originX: 'center',//调整中心点的X轴坐标
  originY: 'center'//调整中心点的Y轴坐标
});
canvas.add(rect);

function animate() {
            // 移动动画
             rect.animate('left', rect.left === 25 ? 275 : 25, {
                duration: 1000,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: animate,
                easing: fabric.util.ease.easeInCubic
            }); 
 
            // 旋转动画
            rect.animate('angle', rect.left === 25 ? 360 : 0, {
                duration: 1000,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: animate,
                easing: fabric.util.ease.easeInCubic
            });
        }
        

        
        
      /*  window.onload = function() {
         animate();
       }  */
       


/* canvas.item(0).selectable = false; */

/* canvas.item(0).hasControls = false; */

var img = 'http://tairan-hik-snapshot-prd.oss-cn-shenzhen.aliyuncs.com/deviceImg/thumbnail/ba_12.png'
fabric.Image.fromURL(img, function(img) {
  img.set('left', 100).set('top', 100 / 2).set('zindex', 0);
  canvas.add(img);
});
fabric.Image.fromURL(img, function(img) {
  img.set('left', 300).set('top', 100 / 2).set('zindex', 0);
  canvas.add(img);
});
fabric.Image.fromURL(img, function(img) {
  img.set('left', 500).set('top', 100 / 2).set('zindex', 0);
  canvas.add(img);
});
fabric.Image.fromURL(img, function(img) {
  img.set('left', 700).set('top', 100 / 2).set('zindex', 0);
  canvas.add(img);
});

fabric.Image.fromURL(img, function(img) {
  img.set('left', 100).set('top', 350).set('zindex', 0);
  canvas.add(img);
});
fabric.Image.fromURL(img, function(img) {
  img.set('left', 300).set('top', 350).set('zindex', 0);
  canvas.add(img);
});
fabric.Image.fromURL(img, function(img) {
  img.set('left', 500).set('top', 350).set('zindex', 0);
  canvas.add(img);
});
fabric.Image.fromURL(img, function(img) {
  img.set('left', 700).set('top', 350).set('zindex', 0);
  canvas.add(img);
});

var line = new fabric.Line([50, 100, 250, 100], {
    left: 130,
    top: 80,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})

var line2 = new fabric.Line([50, 100, 250, 100], {
    left: 330,
    top: 80,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})
var line3 = new fabric.Line([50, 100, 250, 100], {
    left: 530,
    top: 80,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})

var line4 = new fabric.Line([50, 100, 250, 100], {
    left: 130,
    top: 380,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})
var line5 = new fabric.Line([50, 100, 250, 100], {
    left: 330,
    top: 380,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})
var line6 = new fabric.Line([50, 100, 250, 100], {
    left: 530,
    top: 380,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})

var line7 = new fabric.Line([0, 0, -210, 280], {
    left: 520,
    top: 100,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})

var line8 = new fabric.Line([0, 0, 0, 260], {
    left: 130,
    top: 100,
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    stroke: '#4191f1',
    /* selectable: false, */
})
canvas.add(line, line2, line3, line4, line5, line6, line7, line8);
/* line.animate({
  x2: 250,
  y2: 300
}, {
  onChange: canvas.renderAll.bind(canvas),
  onComplete: function() {
    line.setCoords();
  },
  duration: 3000
}); */
/* var line = new fabric.Line([50, 50, 50, 50],{
  left: 0,
  top: 50,
  stroke: 'red'
});
canvas.add(line);
line.animate({
  x2: 200,
  y2: 50
}, {
  onChange: canvas.renderAll.bind(canvas),
  onComplete: function() {
    line.setCoords();
  },
  duration: 3000
}); */

/* canvas.item(0).selectable = false; */


/* fabric.Image.fromURL('http://tairan-hik-snapshot-prd.oss-cn-shenzhen.aliyuncs.com/deviceImg/thumbnail/ba_12.png', function(img) {
  img.set('left', 262 / 2).set('top', (390 / 2) + 110).set('zindex', 1);
  canvas.add(img);
}); */




/* canvas.setBackgroundImage('https://article.itxueyuan.com/assets/v2/img/bar_qq.png',canvas.renderAll.bind(canvas)); */
/* canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
    fabric.log(o, object);
}); */

 

```


