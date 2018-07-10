import webpack from 'webpack'

module.exports = {

    mode: 'development',

    // ビルドの基点となるファイル
    entry: {
        main: './src/js/app.js',
    },

    // ビルド後のファイル
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },

    plugins: [
        new webpack.DefinePlugin({
        }),
    ],

    devtool: '#sourcemap',
    watch: true,
    target: 'electron-main',

    // 拡張子が.jsのファイルはbabel-loaderを通してビルド(node_modulesは除外)
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};



