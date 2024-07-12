import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root } from './pages/Root.page';
import { ErrorFallback } from './error-pages/ErrorFallback';
import { RootErrorBoundary } from './error-pages/RootErrorBoundary';

import { Basic } from './pages/Basic.page';
import { Responsive } from './pages/Responsive.page';
import { Async } from './pages/Async.page';
import { Popovers } from './pages/Popovers.page';
import { Editable } from './pages/Editable.page';
import { DragNDrop } from './pages/DragNDrop.page';
import { KitchenSink } from './pages/KitchenSink.page';
import { CustomHeader } from './pages/CustomHeader.page';

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
				path: '/responsive',
				element: <Responsive />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/async',
				element: <Async />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/popovers',
				element: <Popovers />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/custom-header',
				element: <CustomHeader />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/editable',
				element: <Editable />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/drag-n-drop',
				element: <DragNDrop />,
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
