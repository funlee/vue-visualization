vue-visualization
==================
这是一个尝试利用 `Vue` 结合 `D3.js` 进行数据可视化开发的练手案例

项目背景
--------
公司的业务是给政府部门做数据可视化的，开发环境和运行环境都是在公安内网中进行的，由于不能使用互联网，因此项目开发没有采用前端工程化的方案，但自己却想尝试一下，看看用框架开发可视化项目是什么样子，因此就做了这个   

主要功能
-------
* 多页面项目，利用 `vue-router` 进行路由管理
* 练习了常用图表（柱状图、饼图、地图）在 Vue 中的实现
* 数据采用 [Mockjs](http://mockjs.com/ "Mockjs") 模拟实现，全是随机数据

技术栈
------
* Vue
* vue-router
* [D3.js 4.0](https://d3js.org/ "D3js v4") 
* [Mockjs](http://mockjs.com/ "Mockjs")

安装
----
```bash
git clone https://github.com/funlee/vue-visualization.git
cd vue-visualization
npm install
npm run dev
```
然后在浏览器里输入：http:localhost:8080 即可访问

在线访问：http://show.funlee.cn/vue-visualization

心得
-----
D3.js 是基于数据来操作 DOM 的 JavaScript 库，而 Vue 允许开发者明确地向 DOM 呈现数据并抽象出复杂的逻辑；这两个都试图做类似的事情，但是如果组合在一起可能难以保持逻辑一致，因此在绘制图表的时候，要明确图表的 DOM 由谁来管理；我的心得就是，简单的（`平面直角坐标系图表`）图表由 Vue 来管理，复杂的图表（`SVG-PATH `居多的）由 D3.js 来管理


