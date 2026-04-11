// Importamos React y las piezas para que la web funcione
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Arrancamos el motor de la aplicación en el navegador
createRoot(document.getElementById('root')!).render(
  // Modo estricto para detectar errores comunes durante el desarrollo
  <StrictMode>
    {/* Para que los enlaces y las rutas funcionen */}
    <BrowserRouter>
      {/* Cargamos nuestra aplicación principal */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
