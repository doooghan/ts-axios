# ts-axios

使用 typescript 实现 axios 的部分 featute

## 实现的 feature

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端方式 XSRF，跨站请求攻击

## 使用的技术

1. 使用 express 开启一个服务，并使用 webpack 进行打包，其中还使用 express.Router 提供接口
2. 类型谓词和类型守卫
3. xhr 的 请求类型需要对应上 content-type

## 一些自己可以做的后续工作

1. 将 examples 内的 dev 服务改为 vite
2. unkown 改写 any
