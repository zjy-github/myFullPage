# myFullPage

## 概述

仿写FullPage插件，并通过插件实现FullPage官网

## 应用方法

* jQuery

* entends 添加实例方法

* 实现链式调用

* 动态添加页面及页面内容个

* 预留添加页面工厂接口

## 目录结构：
<pre>
.
├── index.html
├── src
│   ├── css
│   │   └── index.css
│   ├── img
│   │   └── html.png
│   └── js
│       ├── entry.js // 入口文件
│       ├── pageEngine.js //插件生成方法
│       ├── components//页面内容工厂
│       │   ├── componentNest.js //nest类型工厂
│       │   └── componentJSX.js //JSX类型工厂
│       └── tools //工具
│           ├── jquery.3.3.1.min.js
│           ├── jquery.mousewheel.js //鼠标滚轮JQ插件
│           └── myFullpage.js //插件实现
└── README.md
6 directories, 12 files
</pre>
