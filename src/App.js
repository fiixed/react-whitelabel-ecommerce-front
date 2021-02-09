import React, { useEffect } from 'react'
import { 
  Switch, 
  Route 
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Header from './components/nav/Header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from './pages/Home'
import ForgotPassword from './pages/auth/ForgotPassword'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'

import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'
import CategoryCreate from './pages/admin/category/CategoryCreate'

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
            .then((res) => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id,
                    },
                  });
            })
            .catch(err => console.log(err));

      }
    });
    // cleanup
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header/>
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/register/complete' component={RegisterComplete}/>
        <Route path='/forgot/password' component={ForgotPassword}/>
        <UserRoute path='/user/history' component={History}/>
        <UserRoute path='/user/password' component={Password}/>
        <UserRoute path='/user/wishlist' component={Wishlist}/>
        <AdminRoute path='/admin/dashboard' component={AdminDashboard}/>
        <AdminRoute path='/admin/category' component={CategoryCreate}/>
      </Switch>
      
    </>
  )
}

export default App;
