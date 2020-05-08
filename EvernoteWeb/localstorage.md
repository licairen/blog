### 单页面监听localStorage的值

### 
>背景：在同一个html页面修改localStorage的值或者在MVVM框架下进行开发时修改localStorage的值，由于是单页面应用，会出现监听storage事件失效的问题，对此，重写localStorage可解决该问题。


``` javascript
 //重写localStorage实现在当前页面监听
    var orignalSetItem = localStorage.setItem;
    localStorage.setItem = function(key,newValue){
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.key = key;
        setItemEvent.newValue = newValue;
        setItemEvent.oldValue = localStorage.getItem(key);
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this,arguments);
    }
//监听storage
    window.addEventListener("setItemEvent", function (e) {
       //此处执行storage的值改变后的操作
      .....
    });
//根据需要改变localStorage的值
    $("#navTitle").on('click','li',function () {
        var title = $(this).text().trim();
        localStorage.setItem('change_icon',title);
    })
```
