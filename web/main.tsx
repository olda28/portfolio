import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Tooltip from "./components/atoms/Tooltip.tsx";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App/>
		<Tooltip/>
	</StrictMode>
)
