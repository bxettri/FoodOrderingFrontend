import React from 'react'
import  Navbar  from '../Layouts/Navbar';
import Category from './Category'
import Poppular from './Poppular'
import Footer from '../Layouts/Foot'
import Restuarant from './Restuarant'
import ResturantFood from './ResturantFood';
import Slider from './Slider';
import Topbar from '../Layouts/Topbar';
import Browseplace from '../Layouts/Browseplace';



export default function LandingPage() {
    return (
        <div>
            
             <Navbar />
             
             <Slider />
           

            

            <Category />
            
           <Poppular />

            <Restuarant/>
           
           <ResturantFood />

           <Footer/>
        </div>
    )
}
