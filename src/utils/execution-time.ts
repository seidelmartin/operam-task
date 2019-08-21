import { isPromise } from './is-promise'

const logEndTime = (message: string, start: [number, number]) => {
  const end = process.hrtime(start)
  console.info(`${message}: %ds %dms'`, end[0], end[1] / 1e6)
}

export const logExecutionTime = <F extends () => any> (fn: F, message: string): ReturnType<F> => {
  const start = process.hrtime()
  const result = fn()

  if (isPromise(result)) {
    result.finally(() => logEndTime(message, start))
  } else {
    logEndTime(message, start)
  }

  return result
}
