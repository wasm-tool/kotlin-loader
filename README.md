# @wasm-tool/kotlin-loader

> Webpack loader for Kotlin

## Installation
`yarn add --dev @wasm-tool/kotlin-loader`

###`Kotlin-native`

We expect `kotlin-native` to be in your `$PATH`. To install check [here](https://github.com/JetBrains/kotlin-native#kotlinnative)

## Usage 

Add the loader and plugin in your `webpack.config.js` here:

```js
module.exports = {
  // ...

  module: {
    rules: [
      {
        test: /Main.kt$/,
        loader: "@wasm-tool/kotlin-loader"
      }
    ]
  }, 
 // ...

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ]
  // ...

};
```

Add this script to the `index.html` template

```html
    <script wasm="program.wasm" src="program.wasm.js"></script>
```

