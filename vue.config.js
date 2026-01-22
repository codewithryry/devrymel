// vue.config.js
module.exports = {
    chainWebpack: (config) => {
      // Add a rule for PDF files
      config.module
        .rule('pdf')
        .test(/\.pdf$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/[name].[hash:8].[ext]', // Output path and filename
        });
    },
  };