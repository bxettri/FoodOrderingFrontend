import React, { Component } from 'react'
import wine from '../assets/bg.jpg'
import '../Pages/Css/slider.css'


export default class Slider extends Component {
    render() {
        return (
            <div>
                <img alt="winePic" src={wine}  id="slide"/>
            </div>
        )
    }
}
