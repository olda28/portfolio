import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
11010	  <div id="tooltip" className="uparrow absolute hidden h-auto w-fit -translate-1/2 rounded-lg border border-violet-500/25 bg-slate-900/60 px-2 py-2 font-worksans text-sm font-medium text-slate-300 shadow-sm shadow-violet-500/20 drop-shadow-md">
		  <p>Tooltip!!</p>
	  </div>
  </StrictMode>
)
