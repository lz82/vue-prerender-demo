# vue-prerender-demo
a web app build with vue.js &amp; webpack &amp; prerender-spa-plugin
base vue 2.x webpack 4.x prerender-spa-plugin 3.x

# 简介
使用SSR确实对原来的代码侵入性太大了，因此在使用SSR之前，还是想更好的了解下Prerender的用法，这样才能在实际应用场景中，做出最合适的选择。


# 原理
其实在安装`prerender-spa-plugin`的时候，就能猜到大概的原理，因为你会发现，他依赖于Chrome的[puppeteer](https://github.com/GoogleChrome/puppeteer),
后来会发现，这才是学习`Prerender-Spa-Plugin`最大的困难，因为如果没有翻墙，安装100多M的`Chromium`会很麻烦，关于这个安装，网上会有很多相关文章结束。

回到正题，虽然没有看过源码，但是直观的感觉，就是这个plugin会像个爬虫一样，在本地把你指定要预渲染的路由，都跑一遍，再把内容存到指定的输出目录。

# 使用
强调一下，这里使用的`prerender-spa-plugin`是3.x版本的，网上搜到的很多都是2.x的。

## 基本用法
如果是纯静态页面（没有异步获取数据逻辑时，仅仅只需要在`webpack.config`中使用`prerender-spa-plugin`插件，并设置`staticDir`和`routes`这两个属性值即可。
顾名思义这两个属性一个是指打包出来的静态文件的目录，另一个是希望预渲染的路由。如下图所示。
另外，如果要使用预渲染，路由的`mode`必须是`history`

![basic usage](https://github.com/lz82/vue-prerender-demo/blob/master/basic.png)


## 存在异步加载数据
想要在预渲染阶段，把异步获取的数据渲染出来，官方给了两个方案。

1. 使用`renderAfterTime`属性
顾名思义，让`爬虫`等一段时间之后触发。

2. 使用`renderAfterDocumentEvent`
在某个`DocumentEvent`事件之后触发

官方给的demo中，就是在每个要预渲染的页面中，在异步数据获取到之后，手动派发一个事件，比如:`document.dispatchEvent(new Event('render-event'))`,
但是，我在使用这个方法的时候，始终获取不到异步数据，欢迎指出问题。 :smile: 

在这个demo中，最终使用的方案是`renderAfterTime: 5000`，也就是在等待5s之后再把渲染结果保存。

## headless
至于`headless`这个选项其实无关痛痒，因为`puppeteer`默认是以`headless`(无头)模式执行的，但是也可以以`Chromium`的模式执行。


# 小结
其实在学习的过程中，也很不顺利，异步数据一直无法渲染出来，也提了[Issue](https://github.com/chrisvfritz/prerender-spa-plugin/issues/249),
后来发现根本原因是`PrerenderSpaPlugin`的属性设错了，应该是`renderer`,但是却写成了`render`（我也不记得在哪里copy来的了)
在找原因的过程中，也看了其他人提的issue,包括好心人也提出了各种解决方案，比如在根节点添加`data-server-rendered="true"`属性，`renderAfterTime`和`renderAfterDocumentEvent`二选一只保留一个，等等。

虽然最终没有解决我的问题，但是还是有很大的参考价值。

