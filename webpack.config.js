const {resolve} = require('path');

module.exports = {
    name: "phpAPI",
    entry: ".",
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: [
                    /node_modules/
                ],
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.(ts)$/,
                exclude: [
                    /node_modules/
                ],
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    },
    output: {
        filename: "main.js",
        path: resolve(__dirname, "dist/")
    }, 
    resolve: {
        extensions: [".js", ".ts"]
    }
};