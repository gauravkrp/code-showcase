//const cacheableResponse = require('cacheable-response')
//const cors = require('cors')
const express = require('express')
const next = require('next')
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();

// Our Redirection Script
function redirectTrailingSlash(req, res, next) {
  let paths = req.url.split("?") // get url and query from request
  let path = paths[0], query = null; // split request and query  
  console.log(paths)
  if (paths.length > 1)
    query = paths.slice(1, paths.length).join("?") // Rebuild query
  
  if (path.substr(-1) === '/' && path.length > 1)
    res.redirect(301, path.slice(0, -1) + ((query)?('?'+query):'')); // Redirect User with 301 and without the slash
  else
    next();
}

app.prepare()
  .then(() => {
    const server = express();
    //server.use(redirectTrailingSlash) // redirect handler (should be before nextjs handler)
    server.get('*', (req, res) => {
      req.url = req.url.replace(/\/$/, "");
      if (req.url == "") {
        req.url = "/";
      }
      return handle(req, res);
    });
      
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Next App running on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });