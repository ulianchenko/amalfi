import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from '../layouts/main'
import Page404 from '../components/pages/Page404';
import { getIsLoggedIn } from '../store/users';


export const navigationRoutes = [
  { path: '/rooms', name: 'Rooms' },
  { path: '/services', name: 'Services' },
  { path: '/vacancy', name: 'Vacancy' },
  { path: '/news', name: 'News' },
  { path: '/agreement', name: 'Agreement' },
];

  const AppRouter = () => {
    const Login = React.lazy(() => import('../layouts/login'));
    const Rooms = React.lazy(() => import('../layouts/rooms'));
    const Profile = React.lazy(() => import('../layouts/profile'));

    const isLoggedIn = useSelector(getIsLoggedIn());


    return (
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Routes>
            {isLoggedIn ?
              <Route path='/profile' element={<Profile />} >
                <Route path=':userId' element={<Profile />} >
                  <Route path=':route' element={<Profile />}/>
                </Route>
              </Route> : null
            }
            <Route path='/' element={<Main />} />
            <Route path='/rooms' element={<Rooms/>} >
              <Route path=':roomId' element={<Rooms />} />
            </Route>
            {/* <Route path='/rooms/:roomId' element={<Rooms />} /> */}
            <Route path='/login' element={<Login />} >
              <Route path=':type' element={<Login />} />
            </Route>
            {/* { isLoggedIn ?
            <Route path='/profile' element={<Profile />} >
              <Route path=':userId' element={<Profile />} />
            </Route> : null } */}
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
};

export default AppRouter;