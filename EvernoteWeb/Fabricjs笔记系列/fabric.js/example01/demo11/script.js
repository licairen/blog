/*
 * @Author       : 李才人
 * @Date         : 2020-08-22 20:21:45
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-22 21:00:40
 * @FilePath     : /Fabricjs笔记系列/fabric.js/ex1/demo11/script.js
 */
var canvas = new fabric.Canvas('canvas');
//声明一个正方形
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: 'red'
});
//声明一个圆形
var circle = new fabric.Circle({
    radius: 50,
    top: 100,
    left: 200,
    fill: 'green'
})
//把声明好的正方形和圆形进行组合
var group = new fabric.Group([rect, circle], { left: 200, top: 100 });
//在组合好之后我们又声明了一个正方形，并加入到组合图形的中间
group.addWithUpdate(new fabric.Rect({
    fill: 'blue',
    width: 100,
    height: 100,
    left: 100 || group.getLeft(),
    top: 100 || group.getTop(),
    originX: 'center',
    originY: 'center'
}));

canvas.add(group);