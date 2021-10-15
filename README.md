<div style="text-align:center;" align="center">

# Todo

![](svg/author-hec9527.svg)
![](svg/license-MIT.svg)
![](svg/ts-4.4.4.svg)
![](svg/mobx-6.3.3.svg)
![](svg/parcel-2.0.0.svg)

</div>

## 说明

`todo`是一个使用 React、Typescript 构建的应用，包含项目中多种数据管理的实现方式，主要分为 redux 和 mobx 两大类以及他们各自不同版本、不同实现方式。可以 clone 仓库然后切换到其它分支查看具体实现。

| 分支    | 说明                                                                                 |
| ------- | ------------------------------------------------------------------------------------ |
| master  | 使用传统的基于 connect 链接 redux 以及 react 组件的方式                              |
| hooks   | 使用基于 hooks 的方式组织代码 `react>16.8` 并且`react-redux>7.1.0`                   |
| RTK     | 使用基于[redux tookit](https://www.npmjs.com/package/@reduxjs/toolkit)组织的代码结构 |
| mobx-V6 | 基于 mobx-v6 版本的数据管理实现，采用传统的 inject 方式，没有采用 hook 封装          |

使用 mobx 尤其需要注意几个点

1. 需要使用 mobx 数据仓库的组件需要使用 `observer` 包裹
2. mobx 中的响应式数据，不要解构赋值，会导致其失去响应式
   ```js
   // 假如我们数据仓库中有如下响应字段
   const order = {
     orderNo: 10086951121,
     orderPrice: 9999.99,
     productName: 'iphone 13 1T 远峰蓝',
   };
   //
   ```

## Building and running on localhost

clone repository to local

```zsh
git clone https://github.com/hec9527/todo
cd todo
```

install dependence

```zsh
yarn
```

To start your server

```zsh
yarn start
```

To create a production build

```zsh
yarn build
```

## Running

Open the file `dist/index.html` in your browser

## screenshots

<div style="display:flex;">
<img src="./images/20210824_16-58-10.png" width='auto' height='300' style="margin-right:8px" />

<img src="./images/20210824_16-58-48.png" width='auto' height='300' />
</div>

## LICENSE

[MIT](./LICENSE)
