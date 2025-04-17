import { RootProvider } from '@context';
// Initialize Sentry
import '@utils/Sentry';

export default function RootLayout(): JSX.Element {
  return <RootProvider />;
}
