module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
    },
}