import type { AppProps } from 'next/app'
import ModelProvider from '../contexts/modal';
import SubmissionProvider from '../contexts/submit';
import '../styles/globals.css'

declare global {
  interface Window {
    isUpdateAvailable: any;
    workbox: any;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ModelProvider>
      <SubmissionProvider>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <Component {...pageProps} />
      </SubmissionProvider>
    </ModelProvider>
  );
}

export default MyApp