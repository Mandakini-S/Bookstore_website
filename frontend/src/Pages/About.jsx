import React from "react";
import Store from "../assets/about.png"

const About = () => {
  return (
    <>
      <div className="flex flex-col mb-20 md:flex-col xl:flex-row w-full mx-auto mt-20 sm:w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 px-4 py-8 sm:px-6 md:px-8 lg:px-10 rounded-3xl bg-[#347576]">
        <div className="flex flex-col justify-center px-4 py-6 md:px-8 lg:px-2 text-gray-700">
          <h1 className="text-3xl sm:text-4xl text-[#f48908] md:text-5xl mb-4 font-Poppins">
          Welcome to Aaaaaaaaa Pustak Pasal!
          </h1>
          <p className="text-base text-white sm:text-lg text-whitemd:text-xl mb-4">
          At Aaaaaaaaa Pustak Pasal, we pride ourselves on being your one-stop destination for all your reading, sports, and stationery needs. Whether you're a book lover, a sports enthusiast, or someone looking for quality stationery, we have something special for everyone.

          </p>
          <h2 className="text-2xl sm:text-3xl text-[#f48908] mb-2">Why Us?</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2 text-base text-white sm:text-lg md:text-xl">
              <span className="font-bold ">Quality Products:</span> We ensure that all our products are of the highest quality, sourced from reputable brands.
            </li>
            <li className="mb-2 text-base text-white sm:text-lg md:text-xl">
              <span className="font-bold">Friendly Staff:</span> Our knowledgeable and friendly staff are always here to help you find exactly what you need.
            </li>
            <li className="mb-2 text-base text-white sm:text-lg md:text-xl">
              <span className="font-bold">Convenient Location:</span> Easily accessible, with ample parking and a welcoming atmosphere.

            </li>
          </ul>
          {/* <h2 className="text-2xl sm:text-3xl mb-2"> Visit Us Today!</h2> */}
          {/* <p className="text-base sm:text-lg md:text-xl mb-4">
          Stop by [Your Book Shop Name] and discover a world of books, sports items, and stationery that will inspire and equip you for all your pursuits. Whether you're shopping for yourself or looking for the perfect gift, we have something for everyone.
          </p> */}
         



        </div>
        <div className="flex justify-center items-center w-full md:w-35">
    <img
      src={Store}
      alt="Illustration for book"
      className="w-full md:w-auto max-w-lg "
    />
  </div>

      </div>
      
    </>
  );
};

export default About;

