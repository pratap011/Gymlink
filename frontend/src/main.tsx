import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import router from './routes/router.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
