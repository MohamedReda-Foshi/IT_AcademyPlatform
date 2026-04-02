"use client"

import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Image from 'next/image';

function Courses() {
    return (
        <div className='container mx-auto px-10 py-2 gap-5'>
            <div className='slider-container gap-4 w-full flex overflow-hidden max-h-[400px] rounded-sm shadow-lg'>
                <Slider>
                    {/* eslint-disable */}
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Slider's images"
                        width={100}
                        height={100}
                        className='object-contain opacity-70 relative transition-all after:absolute after:w-full after:h-full after:bg-black'
                    />
                </Slider>
            </div>
        </div>
    )
}

export default Courses;