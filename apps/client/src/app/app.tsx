// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Login } from '../components/Auth/Login';
import { Main } from '../components/Main/Main';

import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AddContainer } from '../components/AddConrainer/AddContainer';
import { AddFigure } from '../components/AddFigure/AddFigure';
import { LevelSettings } from '../components/LevelSettings/LevelSettings';
import { Settings } from '../components/Settings/Settings';
import { Game } from '../components/Game/Game';
import { Rating } from '../components/Rating/Rating';
import { Control } from '../components/Control/Control';
import { AboutDevelopers } from '../components/AboutDevelopers/AboutDevelopers';
import { AboutSystem } from '../components/RoutesComponents/AboutSystem';
import { RequireAdminRole } from '../utils/RequireAdminRole';
import { Signup } from '../components/Auth/Signup';

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: '',
          element: <Main />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'game',
          element: <Game />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
        {
          path: 'rating',
          element: <Rating />,
        },
        {
          path: 'control',
          element: <Control />,
        },
        {
          path: 'developers',
          element: <AboutDevelopers />,
        },
        {
          path: 'system',
          element: <AboutSystem />,
        },
        {
          path: '/',
          element: <RequireAdminRole />,
          children: [
            {
              path: 'container',
              element: < AddContainer/>,
            },
            {
              path: 'figure',
              element: <AddFigure />,
            },
            {
              path: 'level',
              element: <LevelSettings />,
            },
          ],
        },
      ],
    },

  ]);
  return (
    <RouterProvider router={router} />      
  );
}

export default App;
