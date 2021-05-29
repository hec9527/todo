<div style="text-align:center;" align="center">

# Todo

![](svg/author-hec9527.svg)
![](svg/license-MIT.svg)
![](svg/ts-4.2.4.svg)
![](svg/redux-4.1.0.svg)

</div>

## 说明

`todo`是一个使用 React、 Redux、 Typescript 构建的应用，该应用可以很好地帮助学习和理解 redux。搭配 Typescript，可以智能推断数据类型和智能提示。

代码仓库中包含多个分支，每个分支都是针对 react-redux 不同使用方式组织代码结构

| 分支   | 说明                                                                                 |
| ------ | ------------------------------------------------------------------------------------ |
| master | 使用传统的基于 connect 链接 redux 以及 react 组件的方式                              |
| hooks  | 使用基于 hooks 的方式组织代码 `react>16.8` 并且`react-redux>7.1.0`                   |
| RTK    | 使用基于[redux tookit](https://www.npmjs.com/package/@reduxjs/toolkit)组织的代码结构 |

## Building and running on localhost

clone repository to local

```zsh
git clone https://github.com/hec9527/todo
```

change the path

```zsh
cd todo
```

install dependence

```zsh
npm i
```

To start your server

```zsh
npm start
```

To create a production build

```zsh
npm build-prod
```

## Running

Open the file `dist/index.html` in your browser

## screenshots

<div style="display:flex;">
<img src="./images/20210527_18-31-21.png" width='auto' height='300' style="margin-right:8px" />

<img src="./images/20210527_18-31-29.png" width='auto' height='300' />
</div>

## LICENSE

[MIT](./LICENSE)
