import { ApolloServer } from 'apollo-server-micro'

import { schema } from './schema'
import { createErrorFormatter, sentryIgnoreErrors } from './errors'

export type Options = {
  version: string
  sentryDsn?: string
}

export default function createHandler(options: Options) {
  let Sentry

  if (options.sentryDsn) {
    Sentry = require('@sentry/node')
    Sentry.init({
      dsn: options.sentryDsn,
      release: `graphql-rss-parser@${options.version}`,
      environment: process.env['NODE_ENV'],
      ignoreErrors: sentryIgnoreErrors,
      onFatalError(error: Error) {
        // @ts-ignore
        console.error(error, error.response)
      },
      debug: process.env['DEBUG_SENTRY'] == 'true',
    })
  }

  const formatError = createErrorFormatter(Sentry)
  const apolloServer = new ApolloServer({ schema, formatError })

  return apolloServer.createHandler({ path: '/' })
}
