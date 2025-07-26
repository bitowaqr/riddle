import { addErrorToLog } from '../storage'

export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('error', async error => {
    addErrorToLog({
      type: 'runtime',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
    console.error('[error-checker] Runtime error logged to file:', error.message)
  })
})