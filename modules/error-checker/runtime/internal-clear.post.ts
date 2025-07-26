import { errorStore } from '../storage'

export default defineEventHandler(() => {
  // This function clears the one and only RUN-TIME store instance.
  errorStore.clear()
  console.log('[error-checker] Runtime error store cleared via internal API call.');
  return { status: 'ok' }
})