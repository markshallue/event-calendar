import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RootErrorBoundary, ErrorFallback } from './error-pages';

import {
	Home,
	Basic,
	Root,
	Responsive,
	Async,
	Popovers,
	Editable,
	DragNDrop,
	KitchenSink,
	CustomHeader,
	FullCalendarExample,
	ContextMenuPage,
} from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <RootErrorBoundary />,
		children: [
			{
				path: '/',
				element: <Home />,
				errorElement: <ErrorFallback />,
			},
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
				path: '/context-menu',
				element: <ContextMenuPage />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/drag-n-drop',
				element: <DragNDrop />,
				errorElement: <ErrorFallback />,
			},
			{
				path: '/full-calendar',
				element: <FullCalendarExample />,
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
