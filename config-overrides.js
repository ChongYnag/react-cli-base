
const { override, addWebpackAlias } = require('customize-cra');
const path = require("path");
const rewirePostcss = require('react-app-rewire-postcss');
const px2rem = require('postcss-px2rem')
module.exports = override(
    //增加路径别名的处理 
    addWebpackAlias({
        '@': path.resolve('./src')
    }),
    (config) => {
        // 重写postcss
        rewirePostcss(config, {
            plugins: () => [
                //关键:设置px2rem
                px2rem({
                    remUnit: 37.5,
                    exclude: /node-modules/
                })
            ],
        });
        return config
    }
);