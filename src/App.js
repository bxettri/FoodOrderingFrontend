import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Component/Pages/LandingPage';
import PrivateRoute from './Component/PrivateRoute';
import Home from './Component/Pages/Home';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AddFood from './Component/Admin/AddFood';
import AddRestuarant from './Component/Admin/AddRestuarant';
import foodCategory from './Component/Admin/ListCategory';
import Register from './Component/User/Register';
import Order from './Component/User/viewOrder';
import RestFood from './Component/Pages/RestFood';
import ProfileUpdate from './Component/User/ProfileUpdate';
import Cart from './Component/User/Cart';
import ViewUser from './Component/Admin/ViewUser';

function App() {
  return (
    <div className="App">
       <Router>
         <Route exact path='/' component={LandingPage} /> 
         <Route path='/register' component={Register} />
         <PrivateRoute path='/home' component={Home} />
         <PrivateRoute path ='/admin' component={AdminDashboard} />
         <PrivateRoute path='/addfood' component={AddFood}/>
         <PrivateRoute path='/addresturant' component={AddRestuarant}/>
         <PrivateRoute path='/foodCategory' component={foodCategory}/>
         <PrivateRoute path='/foods' component={RestFood} />
         <PrivateRoute path='/profile' component={ProfileUpdate}/>
         <PrivateRoute path='/viewCart' component={Cart} />
         <PrivateRoute path='/viewuser' component={ViewUser} />
         <PrivateRoute path= '/viewOrder' component={Order} />
       </Router>
    </div>
  );
}

export default App;
