import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
	  <div id="tooltip" className="w-fit h-auto px-2 py-2 absolute hidden -translate-1/2 font-worksans bg-slate-900/60 border border-violet-500/25 text-slate-300 rounded-lg drop-shadow-md shadow-violet-500/20 shadow-sm text-sm font-medium uparrow">
		  <p>Tooltip!!</p>
	  </div>
  </StrictMode>
)
