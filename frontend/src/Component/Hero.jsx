import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero1 from "../assets/HeroSection/hero1.jpg";
import Hero2 from "../assets/HeroSection/hero2.jpg";
import Hero3 from "../assets/HeroSection/hero3.jpg";


const Hero = () =>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };

    return(
        <div className="w-full z-10 relative">
        <Slider {...settings}>
          <div>
            <img
              src={Hero1}
              alt="Book"
              className="w-full object-cover"
              style={{
                height: "540px",
              }}
            />
          </div>
          <div>
            <img
              src={Hero2}
              alt="Book"
               className="w-full object-cover"
              style={{
                height: "540px",
              }}
            />
          </div>
          <div>
            <img
              src={Hero3}
              alt="Book"
            className="w-full object-cover"
              style={{
                height: "540px",
              }}
            />
          </div>
         
        </Slider>
    {/* Text above image */}
    <div className="flex items-center flex-col">
        <p className="text-sm md:text-base lg:text-lg font-Poppins text-center text-white  pt-10 md:pt-20 absolute top-28 left-0 md:left-[250px]">
          Serving since 2003!
        </p>
        <p className="text-2xl md:text-4xl lg:text-5xl font-Poppins text-center text-white  pt-16 md:pt-32 absolute top-32 left-0 md:left-[250px]">
          Get up to 10% Off
        </p>
        <p className="text-2xl md:text-4xl lg:text-5xl font-Poppins text-center text-white  pt-16 md:pt-32 absolute top-44 left-0 md:left-[250px]">
          New Arrivals
        </p>
        <button className="flex items-center font-Poppins cursor-pointer text-base md:text-lg border text-white bg-black dark:bg-white dark:text-black border-gray-400 rounded-3xl px-4 py-1 active:bg-slate-200 absolute top-80 md:top-96 left-0 md:left-[250px]">
          <Link to="/book">Shop Now</Link>
        </button>
      
      </div>
      </div>)
}

export default Hero;