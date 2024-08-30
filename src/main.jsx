
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CryptoContext from './CryptoContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CryptoContext>
      <App />
    </CryptoContext>
  </BrowserRouter>,
)
