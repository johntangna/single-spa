import './public-path'
import React from 'react'
import { Root, createRoot } from 'react-dom/client'
import { ObjectType } from 'qiankun'
import dayjs from 'dayjs'
dayjs.locale('zh-cn')
import 'dayjs/locale/zh-cn'
import 'animate.css'
import Application from './Application'

export function h(type: any, props: any, ...children: any[]) {
  return React.createElement(type, props, ...children)
}

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
  root.render(Application.root())
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

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
