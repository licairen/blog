/*
 * @Author       : 李才人
 * @Date         : 2020-08-22 20:21:45
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-31 11:07:30
 * @FilePath     : /EvernoteWeb/Fabricjs笔记系列/fabric.js/example01/demo9/script.js
 */
var canvas = new fabric.Canvas('canvas');
//方形
var rect = new fabric.Rect({ width: 100, height: 50, fill: 'green' });
rect.on('selected', function() {//选中监听事件
    console.log('selected a rectangle');
});
//圆形
var circle = new fabric.Circle({ radius: 75, fill: 'blue' });
// circle.on('selected', function(e) {
//     console.log('selected a circle', e);
// });


canvas.add(rect);
canvas.add(circle);

canvas.on('circle:moving', (e) => {
    console.log(e)
  })
