var canvas = new fabric.Canvas("canvas");
fabric.Image.fromURL(
  "http://tairan-hik-snapshot-prd.oss-cn-shenzhen.aliyuncs.com/deviceImg/thumbnail/ba_12.png",
  function (img) {
    var img1 = img.scale(1).set({
      left: 100,
      top: 100,
    });
    fabric.Image.fromURL(
      "http://tairan-hik-snapshot-prd.oss-cn-shenzhen.aliyuncs.com/deviceImg/thumbnail/ba_12.png",
      function (img) {
        var img2 = img.scale(1).set({
          left: 175,
          top: 175,
        });
        canvas.add(
            new fabric.Group([img1, img2], { left: 200, top: 200 })
          );
      }
    );
  }
);
