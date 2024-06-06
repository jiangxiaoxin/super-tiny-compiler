
# super-tiny-compiler

超简的编译器。走一遍编译的流程。

[the super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

## 运行说明

```shell

npm install 安装依赖

npm run dev 监听文件变化。变化后会从头执行

npm run start 从头执行一次

npm run test 执行测试

nodemon --config nodemon.json 让nodemon按照配置执行

```

1. 可以用ts来写代码，写完会编译运行
2. 可以运行test测试集.
3. 测试集挺好用的，可以直接断点运行,
4. 使用es module的import写法来写。要进行转义。可以通过测试集直接起debug
5. 其他的vscode f5就可以
