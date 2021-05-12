import ReactDOM from 'react-dom'
import { App } from './App'
import * as Sentry from '@sentry/react'
Sentry.init({ dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' })

ReactDOM.render(
  <Sentry.ErrorBoundary fallback={'An error has occurred'}>
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById('root')
)
