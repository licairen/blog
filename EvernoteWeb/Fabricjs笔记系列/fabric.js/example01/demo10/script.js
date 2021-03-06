/*
 * @Author       : 李才人
 * @Date         : 2020-08-22 20:21:45
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-22 20:50:07
 * @FilePath     : /Fabricjs笔记系列/fabric.js/ex1/demo10/script.js
 */
var canvas = new fabric.Canvas('canvas');
//绘制圆形
var circle = new fabric.Circle({
    radius: 100,
    fill: '#eef',
    scaleY: 0.5,
    originX: 'center',//调整中心点的X轴坐标
    originY: 'center'//调整中心点的Y轴坐标
});
//绘制文本
var text = new fabric.Text('Hello World', {
    fontSize: 30,
    originX: 'center',
    originY: 'center'
})
//进行组合
var group = new fabric.Group([circle, text], {
    left: 150,
    top: 100,
    angle: 10
});

// group.item(0).setFill('red');
group.item(1).set({
    text: 'trololo',
    fill: 'white'
});

canvas.add(group);