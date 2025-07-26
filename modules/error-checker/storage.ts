import path from 'node:path'
import fs from 'fs-extra'

// Define a reliable path for our error log inside node_modules/.cache
const errorFilePath = path.resolve(process.cwd(), 'node_modules', '.cache', 'error-checker.json')

// Ensure the cache directory exists on startup
fs.ensureDirSync(path.dirname(errorFilePath))

// A helper type for our error objects
interface ErrorRecord {
  type: 'build' | 'runtime'
  message: string
  stack?: string
  timestamp: string
}

/**
 * Atomically writes an empty array to the error file.
 */
export function clearErrorLog() {
  try {
    fs.writeJsonSync(errorFilePath, [], { spaces: 2 })
  } catch (e) {
    console.error('[error-checker] Failed to clear error log:', e)
  }
}

/**
 * Atomically reads the log, adds a new error, and writes it back.
 */
export function addErrorToLog(error: ErrorRecord) {
  try {
    const errors = fs.readJsonSync(errorFilePath, { throws: false }) || []
    errors.push(error)
    fs.writeJsonSync(errorFilePath, errors, { spaces: 2 })
  } catch (e) {
    console.error('[error-checker] Failed to add error to log:', e)
  }
}

/**
 * Reads the entire error log from the file.
 */
export function getErrorsFromLog(): ErrorRecord[] {
  try {
    return fs.readJsonSync(errorFilePath, { throws: false }) || []
  } catch (e) {
    console.error('[error-checker] Failed to read error log:', e)
    return []
  }
}