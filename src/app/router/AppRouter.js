import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../layouts/main'
import Page404 from '../components/pages/Page404/Page404';


export const navigationRoutes = [
  { path: '/rooms', name: 'Rooms' },
  { path: '/services', name: 'Services' },
  { path: '/vacancy', name: 'Vacancy' },
  { path: '/news', name: 'News' },
  { path: '/agreement', name: 'Agreement' },
];


const AppRouter = () => {

  const Rooms = React.lazy(() => import('../layouts/rooms'));

  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/rooms' element={<Rooms />} >
            <Route path=':roomId' element={<Rooms />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;