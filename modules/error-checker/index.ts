import { defineNuxtModule, addVitePlugin, addServerHandler, addServerPlugin, createResolver } from '@nuxt/kit'
import { clearErrorLog, addErrorToLog } from './storage'

export default defineNuxtModule({
  meta: {
    name: 'error-checker'
  },
  setup(options, nuxt) {
    if (!nuxt.options.dev) return

    const { resolve } = createResolver(import.meta.url)

    // Clear the log file once when Nuxt starts up
    clearErrorLog()

    addVitePlugin({
      name: 'vite-plugin-error-catcher',
      configureServer(server) {
        server.watcher.on('change', () => {
          // On any file change, clear the error log file.
          clearErrorLog()
        })
      },
      transform(code, id) {
        try {
          return code
        } catch (e: any) {
          // If a transform fails, add the error to the log file.
          addErrorToLog({
            type: 'build',
            message: e.message,
            stack: e.stack,
            timestamp: new Date().toISOString()
          })
          throw e
        }
      }
    })

    // These handlers will now correctly interact with the same log file
    addServerPlugin(resolve('./runtime/plugin.nitro'))
    addServerHandler({
      route: '/api/health',
      handler: resolve('./runtime/api.get')
    })
  }
})