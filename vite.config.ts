import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

function vercelApiPlugin() {
  return {
    name: 'vercel-api-plugin',
    configureServer(server: any) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      Object.assign(process.env, env)

      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/')) {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const filePath = `.${url.pathname}.ts`
            if (fs.existsSync(filePath)) {
              const module = await server.ssrLoadModule(filePath)
              if (module.default) {
                await module.default(req, res)
                return
              }
            }
          } catch (e: any) {
            console.error('API Route Error:', e)
            res.statusCode = 500
            res.end(e.toString())
            return
          }
        }
        next()
      })
    }
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    vercelApiPlugin(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'ui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled', 'lucide-react'],
          'animation-vendor': ['motion', 'canvas-confetti'],
        }
      }
    }
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
