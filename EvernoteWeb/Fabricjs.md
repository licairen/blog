<!--
 * @Author       : 李才人
 * @Date         : 2020-08-21 16:03:27
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-21 16:05:30
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



