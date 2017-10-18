

<div align="center">
  <img src="design/logo128.png" alt="加载图片失败：查词在用" title="查词在用">
  <p align="center">
    <a href="https://github.com/ngolin/webdict/blob/master/dist.crx?raw=true" target="_blank"><img src="https://img.shields.io/badge/download-_lastest_version-blue.svg" download></a>
    <a href="#" target="_blank"><img src="https://img.shields.io/badge/goto-_chrome_webstore-brightgreen.svg" download></a>
  </p>
</div>


## 马上使用


> 你可能需要先下载安装<a href="https://www.baidu.com/s?ie=UTF-8&wd=chrome%20%E6%B5%8F%E8%A7%88%E5%99%A8" target="_blank"> Chrome 浏览器</a>，也就是<a href="https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8" target="_blank">谷歌浏览器</a>。虽然 Chrome 不太好用，我们也不断在找它的替代品，但是八年来一直都没有找到合适的。（如果你找到了更好用的浏览器，请记得告诉我们，:))


从 <a href="#" target="_blank">Chrome 应用商店</a>在线安装，**如果此路不通**，请<a href="https://github.com/ngolin/webdict/blob/master/dist.crx?raw=true" target="_blank">离线下载</a>，然后再以下步骤本地安装：


1. 打开 **扩展程序(Extensions)** 页面：
    1. 在地址栏输入`chrome://extensions/`
    2. 通过菜单导航`更多工具 > 扩展程序(More tools > Extensions)`
2. 将刚刚离线下载的`.crx`文件拖到 **扩展程序** 页面释放即可安装。


## 使用截屏


<h3 align="center" style="color:#07255e">
  英文 · 英式 · 美式 · 对比发音
</h3>
<div align="center">
  <img src="design/screenshot.gif" alt="加载动画失败：Dict in Use">
</div>
<p></p>
<p></p>
<h3 align="center" style="color:#8f0610">
  中文 · 简体 · 繁体 · 比较字形
</h3>
<div align="center">
  <img src="design/screenshot-zh.png" alt="加载图片失败：Dict in Use">
</div>


## 项目结构


#### 第一部分


&emsp;&emsp;这是一个 Chrome 插件，打包这个插件仅需`dist/`一个文件夹，无需依赖其他文件或文件夹，但是`dist/`文件夹内每一个`.js`文件都不能手动编辑，而是由`src/`文件夹内对应的同名模块文件夹（没有`.js`扩展名）编译合成：


<!--
1. `dist/background.js` <= `src/background`
2. `dist/content.js` <= `src/content`
3. `dist/vocabulary.js` <= `src/vocabulary`
4. `dist/notebook.js` <= `src/notebook`
5. `dist/popup.js` <= `src/popup`
-->


<ol style="margin-left:2em">
  <li><code>dist/background.js</code> &lt;= <code>src/background</code></li>
  <li><code>dist/content.js</code> &lt;= <code>src/content</code></li>
  <li><code>dist/vocabulary.js</code> &lt;= <code>src/vocabulary</code></li>
  <li><code>dist/notebook.js</code> &lt;= <code>src/notebook</code></li>
  <li><code>dist/popup.js</code> &lt;= <code>src/popup</code></li>
</ol>


&emsp;&emsp;每个模块文件夹可以包含一个或多个`.ts`文件，但是必须包含一个`main.ts`文件。


#### 第二部分


&emsp;&emsp;`src/dict.auto.html`和`src/dict.auto.css`是主界面的文件，而`src/dict.auto.py`用于把这两个文件合成 JS 代码。

#### 第三部分


&emsp;&emsp;`server/`文件夹下是服务器程序，其中`server/server.py`作为 WSGI 的客户端定义了请求数据的接口，`server/cursor.py`用于连接数据库，`server/razor.py`用于将一个单词逐步去除前缀后缀，形成一个词根家庭单词列表，而`server/family.py`和`server/family.txt`用于不规则变化的单词。

#### 第四部分


&emsp;&emsp;`design/`包含本项目的平面设计原文件，以及本 repo 文档所需的静态图片。

#### 第五部分


&emsp;&emsp;与管理、合成、编码数据库有关文件和数据（行数太多），不在本 repo 中。


#### 注意事项


&emsp;&emsp;**1** 音频文件 和 词库数据 **不包含** 在本 repo 中，它们相对于根目录的路径是：


<!--
- 词库数据：
    - `vocab.db`
- 音频文件：
    - `static/pron/zh`
    - `static/pron/uk`
    - `static/pron/us`
-->


<ul style="margin-left:2em">
  <li>词库数据：
    <ul>
      <li><code>vocab.db</code></li>
    </ul>
  </li>
  <li>音频文件：
    <ul>
      <li><code>static/pron/zh</code></li>
      <li><code>static/pron/uk</code></li>
      <li><code>static/pron/us</code></li>
    </ul>
  </li>
</ul>


&emsp;&emsp;**2** 由于这个插件的`contentscript`会单独注入到每个页面中而且仅在最新版的 Chrome 浏览器中运行，所以请保持使用**最直接**的 JavaScript, 不需引入 react、vue 或 angular 之类的依赖，也无需作浏览器兼容处理。


## 未来计划


1. 为保存的笔记添加编辑功能，之后再加入 Markdown 语法支持，再同步到手机端阅读
2. 重新设计 ICON(`design/icon.ai`)、Logo(`design/logo.ai`)和截屏(`design/dict-in-use.psd`)
3. 注册域名，提供一个网页让每位人向服务器数据库插入新词条及其发音


## 特别感谢


<p align="center">
  <a href="https://github.com/jawil" target="_blank">@微醺岁月</a>
  <a href="https://github.com/Jiahui-Ruan" target="_blank">@Jiahui Ruan</a>
</p>


<p></p>
<p></p>


---


<p></p>
<p></p>


<div align="center">
  <img src="dist/static/icon48.png" alt="加载图片失败：icon">
  <img src="dist/static/icon48.png" alt="加载图片失败：icon">
  <img src="dist/static/icon48.png" alt="加载图片失败：icon">
  <img src="dist/static/icon48.png" alt="加载图片失败：icon">
  <img src="dist/static/icon48.png" alt="加载图片失败：icon">
</div>


<p></p>
<p align="center">
  Made with ♡ by <strong>ngolin</strong>
</p>
<p></p>
<p></p>
