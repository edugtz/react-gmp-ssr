import { Provider } from 'react-redux';
import store from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

import '../styles/globals.scss'

function App({ Component, pageProps }) {
  return <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
  </Provider>
}

export default App
