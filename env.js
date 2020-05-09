module.exports = {
  development: {
    MODE: 'development',
    ENV_API: 'http://www.boatng.cn:7002'   // 测试服务器地址
  },
  production: {
    MODE: 'production',
    ENV_API: 'http://api.trinitygz.com'  // 正式服务器地址
  },
  staging:{
    MODE: 'staging',
    ENV_API: 'http://www.boatng.cn:7002'  // 测试服务器地址
  },
  prod:{
    MODE: 'production',
    ENV_API: 'http://api.trinitygz.com'  // 正式服务器地址
  }
}