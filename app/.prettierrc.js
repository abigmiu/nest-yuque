module.exports = {
    printWidth: 80, //单行长度
    tabWidth: 4, //缩进长度
    useTabs: false, //使用空格代替tab缩进
    semi: false, //句末使用分号
    singleQuote: true, //使用单引号
    quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
    jsxSingleQuote: true, // jsx中使用单引号
    bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
    jsxBracketSameLine: false, //多属性html标签的‘>’折行放置
    arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
    htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
    endOfLine: 'lf', //结束行形式
    embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
  };