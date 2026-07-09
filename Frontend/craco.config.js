module.exports = {
  style: {
    postcss: {
      mode: "extends",
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  devServer: (devServerConfig) => {
    // Delete all legacy options that conflict with newer Node/Webpack schemas
    delete devServerConfig.onAfterSetupMiddleware;
    delete devServerConfig.onBeforeSetupMiddleware;
    delete devServerConfig.https; 
    
    return devServerConfig;
  },
};

module.exports = {
  devServer: (devServerConfig) => {
    return {
      port: 3000,
      host: '127.0.0.1',
      allowedHosts: 'all'
    };
  },
};
