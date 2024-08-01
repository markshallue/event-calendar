import React from 'react';
import ReactDOM from 'react-dom/client';

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@mantine/code-highlight/styles.layer.css';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
