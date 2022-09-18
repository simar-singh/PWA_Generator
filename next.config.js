const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})