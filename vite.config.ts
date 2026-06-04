import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-static-blog-in-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            const urlPath = req.url.split('?')[0];
            if (urlPath === '/blog' || urlPath === '/blog/' || urlPath.startsWith('/blog/')) {
              let targetPath = urlPath;
              if (targetPath.endsWith('/')) {
                targetPath += 'index.html';
              } else if (!path.extname(targetPath)) {
                targetPath += '/index.html';
              }
              const fullPath = path.join(process.cwd(), 'public', targetPath);
              if (fs.existsSync(fullPath)) {
                res.setHeader('Content-Type', 'text/html');
                res.end(fs.readFileSync(fullPath));
                return;
              }
            }
          }
          next();
        });
      }
    }
  ],
})