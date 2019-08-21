export const logExecutionTime = <F extends () => any> (fn: F, message: string): ReturnType<F> => {
  const start = process.hrtime()
  const result = fn()
  const end = process.hrtime(start)
  console.info(`${message}: %ds %dms'`, end[0], end[1] / 1e6)

  return result
}
