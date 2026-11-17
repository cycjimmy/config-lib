import process from 'node:process'

export interface ProcessEnvFlags {
  IS_DEVELOPMENT: boolean
  IS_PRODUCTION: boolean
  IS_DEPLOYMENT: boolean
}

const judgeProcessEnv: ProcessEnvFlags = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEPLOYMENT: process.env.NODE_ENV === 'deployment',
}

export default judgeProcessEnv
