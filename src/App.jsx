import React, { useState, useEffect } from 'react'
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { ConfigProvider } from 'zarm';
import NavBar from '@/components/NavBar';
import 'zarm/es/config-provider/style/css';
import 'zarm/dist/zarm.css';
import enUS from 'zarm/lib/config-provider/locale/en_US';
import routes from '@/router'
function App() {
  const location = useLocation()
  const { pathname } = location
  const needNav = ['/', '/statistics', '/user'] 
  const [showNav, setShowNav] = useState(false) 
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
}, [pathname]) 
  return (
    <>
      <ConfigProvider primaryColor={'#9646acde'} locale={enUS}>
        <Routes>
        {
          routes.map(route => <Route exact key={route.path} path={route.path} element = {<route.component/>}/>)
        }
        </Routes>
      </ConfigProvider>
      <NavBar showNav={showNav} />
    </>
  );
}

export default App
