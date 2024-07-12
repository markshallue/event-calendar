import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Basic } from './pages/Basic.page';
import { Root } from './pages/Root.page';
import { KitchenSink } from './pages/KitchenSink.page';
import { ErrorFallback } from './error-pages/ErrorFallback';
import { RootErrorBoundary } from './error-pages/RootErrorBoundary';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <RootErrorBoundary />,
		children: [
			{
				path: '/basic',
				element: <Basic />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/kitchen-sink',
				element: <KitchenSink />,
				errorElement: <ErrorFallback />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
