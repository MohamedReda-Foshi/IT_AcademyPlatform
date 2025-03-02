"use client"

import React from 'react'
import Course from './Course';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Courses() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
  
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='slider-container'>
                <Slider {...settings}>
                    <div><Course/></div>
                    <div><Course/></div>
                    <div><Course/></div>
                    <div><Course/></div>
                </Slider>
            </div>
        </div>
    )
}

export default Courses