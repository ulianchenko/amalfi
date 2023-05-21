import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Main from '../layouts/main'
// import Rooms from '../layouts/rooms'
import Page404 from '../components/pages/Page404';


export const navigationRoutes = [
  { path: '/rooms', name: 'Rooms' },
  { path: '/services', name: 'Services' },
  { path: '/vacancy', name: 'Vacancy' },
  { path: '/news', name: 'News' },
  { path: '/agreement', name: 'Agreement' },
];

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Main />,
//     errorElement: <Page404 />,
//   },
//   {
//     path: 'rooms',
//     element: <Rooms />,
//     errorElement: <Page404 />,
//   },
//   {
  //     path: 'rooms/:roomId',
  //     element: <Rooms />,
  //     errorElement: <Page404 />,
  //   },
  // ]);

  const AppRouter = () => {
  const Rooms = React.lazy(() => import('../layouts/rooms'));


  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/rooms' element={<Rooms/>} >
            <Route path=':roomId' element={<Rooms />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
  // return <RouterProvider router={router} />
};

export default AppRouter;