const routes = require('next-routes')

// .add(nombre, url, archivo.js)      
module.exports = routes()        
  .add('index')
  .add('channel', '/:slug.:id', 'channel')
  .add('serie', '/:slugChannel.:id/:slug.:id', 'serie')    
  .add('podcast', '/:slugChannel.:id/:slug.:id', 'podcast')    