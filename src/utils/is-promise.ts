export const isPromise = (v: any): v is Promise<any> => !!v && typeof v.then === 'function'

