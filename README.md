# vue为主应用，react为微应用

## 主应用配置

1. 下载qiankun，npm i qiankun
2. 新建一个文件，将一下内容粘贴进去，内容可定制化，最后引入入口处即可
```js
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from "qiankun"
import { subApp } from "./setting"

// 注册微应用
registerMicroApps([
  {
    name: 'fenxiaoExtend', // 微应用名字
    entry: `${subApp}`, // 入口，即另一个应用的地址
    container: '#fenxiao_extend_container', // 微应用的渲染dom节点
    activeRule: '/#/fenxiaoExtend' // 匹配路由，支持通用匹配
  }
], {
  // 生命周期，加载微应用是启动，只加载一次
  beforeLoad: () => {
    console.log('子应用加载前');
  },
  beforeMount: () => {
    console.log('子应用挂载前');
  },
  afterMount: () => {
    console.log('子应用挂载后');
  },
  beforeUnmount: () => {
    console.log('子应用销毁前');
  },
  afterUnmount: () => {
    console.log('子应用销毁后');
  }
}, {
  fetch: window.fetch
})


addGlobalUncaughtErrorHandler((event) => console.log(event));


```

3. 定义路由菜单，主应用正常定义路由和菜单，正常渲染套路
```js
// 路由配置时，支持通配符
{
  path: '/name/*' //其中* 为通配符，主应用匹配微应用任何路径
}
```

4. 定义微应用渲染模板，可通用
```vue
<template>
<!-- 微应用渲染节点，与注册时container要一致 -->
  <div id="fenxiao_extend_container"></div>
</template>
<script>
import { registerMicroApps, start } from "qiankun"
export default {
  name: "Crm",
  mounted() {
    // 挂载是渲染开始，里面sandbox为沙箱，隔离样式所用
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start({ sandbox : { experimentalStyleIsolation: true }});
    }
  },
}
</script>
```

__ps:__

## 微应用配置

1. 导出生命周期给主应用
```js
let root: Root | null
function render(props: ObjectType) {
  const { container } = props
  root =
    root ||
    createRoot(
      container
        ? container.querySelector('#app')
        : document.getElementById('app'),
    )
    // 自制的渲染页面，可改成自己的
  root.render(Application.root())
}

// 此变量为内置变量
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

// 初始化时
export async function bootstrap() {
  console.log('[react16] react app bootstraped')
}

export async function mount(props: ObjectType) {
  console.log('[react16] props from main framework', props)
  render(props)
}
// https://github.com/kobeyk/micro-app-react-template/blob/main/config-overrides.js
export async function unmount(props: ObjectType) {
  // const { container } = props;
  root!.unmount()
  root = null
}

```

2. 添加公共路径，新建一个文件
```js
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

__ps：要注意，此文件要放在入口文件的第一行__

3. 如果打包工具是webpack

webpack 5
```js
const packageName = require('./package.json').name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
  },
};
```


webpack 4
```js
const packageName = require('./package.json').name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```