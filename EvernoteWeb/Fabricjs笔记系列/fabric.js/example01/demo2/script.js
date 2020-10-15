/*
 * @Author       : 李才人
 * @Date         : 2020-08-22 20:21:45
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-31 10:46:38
 * @FilePath     : /EvernoteWeb/Fabricjs笔记系列/fabric.js/example01/demo2/script.js
 */
var canvas = new fabric.Canvas('main');

var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 100,
    height: 100
});

var circle = new fabric.Circle({
    radius: 50,
    left: 200,
    top:100,
    fill:'green',
    height: 200
});

var triangle = new fabric.Triangle({
    width: 80,
    height: 100,
    fill: 'blue',
    left: 300,
    top: 300
})

canvas.add(rect,circle, triangle);