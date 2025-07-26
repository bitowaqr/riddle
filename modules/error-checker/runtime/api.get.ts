import { getErrorsFromLog } from '../storage'

export default defineEventHandler(event => {
  event.node.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')

  const errors = getErrorsFromLog()

  if (errors.length > 0) {
    // event.node.res.statusCode = 500
    return {
      status: 'error',
      count: errors.length,
      errors: errors
    }
  }

  return {
    status: 'ok',
    errors: []
  }
})