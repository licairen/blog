/*
 * @Author       : 李才人
 * @Date         : 2020-08-22 20:21:45
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-22 20:56:19
 * @FilePath     : /Fabricjs笔记系列/fabric.js/ex1/demo6/script.js
 */
var canvas = new fabric.Canvas('canvas');

fabric.Image.fromURL('https://cn.vuejs.org/images/logo.png', function(img) {
    console.log(new fabric.Image)
    // img.filters.push(
    //     new fabric.Image.filters.Sepia(),
    //     new fabric.Image.filters.Brightness({ brightness: 100 })

    // );
    img.applyFilters(canvas.renderAll.bind(canvas));
    canvas.add(img);
});