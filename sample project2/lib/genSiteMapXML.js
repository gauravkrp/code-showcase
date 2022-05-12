const fs = require('fs-extra')
const globby = require('globby')
const prettier = require('prettier')
const fspath = require('path')
const {format} = require('date-fns')

let domainRoot = "#"

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*.js',
    '!src/pages/_*.js',
    '!src/pages/blog/*.js',
    '!src/pages/404.js',
    '!src/pages/test.js'
  ])

  const pagesSitemap = `
    ${pages
      .map((page) => {
        // fetch file modified date
        const resPathAbs = fspath.join(process.cwd(), page) //absolute path
        const fileStats = fs.statSync(resPathAbs, (err, stats) => {
          if(err) throw err;
          return stats;
        });
        const fileMDate = format(new Date(fileStats.mtime), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") //new Date("YYYY-MM-DDTHH:mm:ssTZD")
        const path = page
          .replace('src/pages', '')
          .replace('.js', '')
        let route = path === '/index' ? '' : path
        route = route + '/'
        console.log(fileStats.mtime, fileMDate)
        return `
          <url>
            <loc>${`${domainRoot}${route}`}</loc>
            <changefreq>weekly</changefreq>
            <lastmod>${fileMDate}</lastmod>
            <priority>${route===''?'1.0':'0.95'}</priority>
          </url>
        `;
      })
      .join('')}
  `;

  const finalSiteMap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pagesSitemap}
    </urlset>
  `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(finalSiteMap, {
    ...prettierConfig,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();