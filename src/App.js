import React from 'react';


import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Component/Pages/LandingPage';
import PrivateRoute from './Component/PrivateRoute';
import Home from './Component/Pages/Home';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AddFood from './Component/Admin/AddFood';
import AddRestuarant from './Component/Admin/AddRestuarant';
import Register from './Component/User/Register';
import ActiveUser from './Component/Admin/Header/ActiveUser';
import Order from './Component/Order';
import RestFood from './Component/Pages/RestFood';
import AdminPart from './Component/AdminPart';
import ProfileUpdate from './Component/User/ProfileUpdate';
import Cart from './Component/User/Cart';





function App() {
  return (

    <div className="App">
        
       

       <Router>
         <Route exact path='/' component={LandingPage} /> 
         <Route path='/register' component={Register} />
         <Route path= '/adminlogin' component={AdminPart} />
         <PrivateRoute path='/home' component={Home} />
         <PrivateRoute path ='/admin' component={AdminDashboard} />
         <PrivateRoute path='/addfood' component={AddFood}/>
         <PrivateRoute path='/addresturant' component={AddRestuarant}/>
          <PrivateRoute path='/food' component={RestFood} />
          <PrivateRoute path='/profile' component={ProfileUpdate}/>
          <PrivateRoute path='/order' component={Cart} />
          <PrivateRoute path='/viewuser' component={ActiveUser} />
          <PrivateRoute path= '/vieworder' component={Order} />
          

        
       </Router>
      
  
    </div>

  
    
  );
}

export default App;
