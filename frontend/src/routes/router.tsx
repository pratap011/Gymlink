import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import App from '../App'; // optional layout
import Register from '../Pages/Register'
import SetupProfile from '../Pages/SetupProfile';
import Home from '../Pages/Home';
import ProtectedRoute from './protectedRoute';
import FindFriends from '../Pages/FindFriends';
import Profile from '../Pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>, // optionally use layout
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    {
        path: 'setup-profile',
        element: <SetupProfile />,
      },
      {
        path: 'findfriends',
        element: <FindFriends />,
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]);

export default router;
