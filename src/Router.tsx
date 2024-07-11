import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Basic } from './pages/Basic.page';
import { Root } from './pages/Root.page';
import { KitchenSink } from './pages/KitchenSink.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/basic',
        element: <Basic />,
      },
      {
        path: '/kitchen-sink',
        element: <KitchenSink />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
