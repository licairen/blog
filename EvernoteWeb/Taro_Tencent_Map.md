### Taro接入腾讯地图

### Taro接入腾讯地图使用路线规划

#### 接入指引

1、插件申请接入：
在腾讯公众平台中， “微信小程序官方后台-设置-第三方服务-插件管理” 里点击 “添加插件”，搜索 “腾讯位置服务路线规划” 申请，审核通过后，小程序开发者可在小程序内使用该插件。

2、引入插件包：

* 路线规划appId： wx50b5593e81dd937a

3、设置定位授权

```
// app.js
config = {
	.....,
	// 引入插件包
	plugins: {
        "routePlan": {
            "version": "1.0.3",
            "provider": "wx50b5593e81dd937a"
        }
    },
    // 设置定位授权：
	permission: {
    	"scope.userLocation": {
    		"desc": "为了更好地服务与您,请您允许我的请求"
    	}
    }
}
```

4、使用插件：

插件页面调用示例：

```
let plugin = requirePlugin('routePlan');
let key = '';  // 使用在腾讯位置服务申请的key 
let referer = '楼掌门';   // 调用插件的app的名称
let endPoint = JSON.stringify({  // 终点
  'name': '中国储能大厦',
  'latitude': 22.5377690000,
  'longitude': 113.9452290000
});
Taro.navigateTo({
  url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
});
```
![李才人](http://mmbiz.qpic.cn/mmbiz_png/HU7OLfwSheFjdCDdGnJrhdEkxzgow3GqQKNPbdVjyFuU4ADicqWdgcxFic1ic4CPiaL8sxrwm9eHiajzGT5oVOKgjeg/0)
![李才人](http://mmbiz.qpic.cn/mmbiz_png/HU7OLfwSheFjdCDdGnJrhdEkxzgow3GqUBVzBnYDdcibiclr8ibxib1RMsibXehEmrotqIHDaSGMgPvjNuO639hGuog/0)
![李才人](http://mmbiz.qpic.cn/mmbiz_png/HU7OLfwSheFjdCDdGnJrhdEkxzgow3GqDVLw5M8BoHB6fWc1CadcWeQCHzgaeicHxFp1C9k0LEkNG1UWibPjS8icQ/0)
![李才人](http://mmbiz.qpic.cn/mmbiz_png/HU7OLfwSheFjdCDdGnJrhdEkxzgow3Gqo6FdYR7fUyWiabl7moIJByZjiaWMOzREprsLBd40Rtib1ickMYwBF3n4ew/0)

