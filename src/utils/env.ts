import _ from 'lodash';

let env = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_VERSION: process.env.NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_DISABLE_LOGS: process.env.NEXT_PUBLIC_DISABLE_LOGS,
  NEXT_PUBLIC_ENABLE_SERVER_LOGS: process.env.NEXT_PUBLIC_ENABLE_SERVER_LOGS,
}

let parsedEnv = null

export function getParsedEnv(): any {
  if (!parsedEnv) {
    const result: any = {...env}
    Object.keys(result).forEach(key => {
      if (['true', 'false'].includes(result[key])) {
        result[key] = result[key] === 'true'
      }
    })
    parsedEnv = result;
  }
  return parsedEnv;
}