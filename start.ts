import express from 'express'
import cookieParser from 'cookie-parser'
import { dirname, join, resolve } from 'node:path';
import  { renderFile } from 'ejs'

import ApiRoutes from '@server/routes/api'
import LoginRoutes from '@server/routes/login'
import DashboardRoutes from '@server/routes/dashboard'

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = process.cwd();
  const browserDistFolder = resolve(serverDistFolder, './public');
  const indexHtml = join(serverDistFolder, 'index.html');

  server.engine('html' , renderFile )
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(cookieParser())

  // Example Express Rest API endpoints
  server.use('/api', ApiRoutes )
  // server.get('/api/**', (req:any, res:any) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.use('/dashboard', DashboardRoutes )
  server.get('*', LoginRoutes )
  
  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4001;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();