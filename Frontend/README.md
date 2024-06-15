# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



import React from "react";
import book from "../../public/book.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Bookcard from "./Bookcard";
import { NavLink } from "react-router-dom";

export default function Book() {
  const genreList=(<>
  <li><NavLink>Romance</NavLink></li>
  <li><NavLink>Horror</NavLink></li>
  <li><NavLink>Adventure</NavLink></li>
  <li><NavLink>Biography</NavLink></li>
  </>
  )
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const FreeBookData = book.filter((data) => data.category === "free");
  const PaidBookData = book.filter((data) => data.category === "paid");

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-10 px-4">
      <div className="text-2xl md:text-4xl text-center">Books</div>
      <div>
        <div className="text-xl md:text-2xl my-2">Free Books</div>
        <p className="mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          molestias, aliquid laborum, laboriosam illo iste beatae et tempora id
          modi vero neque, assumenda est. Maiores in nulla similique velit
          temporibus.
        </p>
        <Slider {...settings}>
          {FreeBookData.map((item) => (
            <Bookcard item={item} key={item.id} />
          ))}
        </Slider>
      </div>
      <div>
        <div className="text-xl md:text-2xl my-2">Paid Books</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          molestias, aliquid laborum, laboriosam illo iste beatae et tempora id
          modi vero neque, assumenda est. Maiores in nulla similique velit
          temporibus.
        </p>
        <Slider {...settings}>
          {PaidBookData.map((item) => (
            <Bookcard item={item} key={item.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

https://cdn.pixabay.com/photo/2017/08/07/03/22/books-2599241_1280.jpg
https://assets.gqindia.com/photos/63ae9287c3feba94029eddc7/16:9/w_1920,c_limit/Best-Indian-Fiction-2022_02.jpg
https://publishdrive.com/media/posts/334/responsive/what-is-an-ebook-lg.png

<label className="input input-bordered bg-transparent flex items-center gap-2 mt-4">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>