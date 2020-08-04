<!--
 * @Author       : 李才人
 * @Date         : 2020-08-04 17:12:09
 * @LastEditors  : 李才人(7737841@qq.com)
 * @LastEditTime : 2020-08-04 17:15:13
 * @FilePath     : /blog/EvernoteWeb/element-ui.md
-->

> el-select 可搜索功能，实现对输入的搜索内容进行控制
``` javascript
    <el-select
    v-model="searchForm.productId"
    placehoder="请输选择产品或输入产品名字过滤"
    filterable
    @input.native="filterData"
    clearable
    ref="searchSelect"
    >
    <el-select>

    filterData(){
      var str = this.$refs.searchSelect.$data.selectedLabel;// 此属性得到输入的文字
      // 控制的js
      if(str.length>20){this.$refs.searchSelect.$data.selectedLabel = str.substr(0,21)
    }
```