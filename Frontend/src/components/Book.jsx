import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Bookcard from "./Bookcard";
import axios from "axios";

export default function Book() {
  const [bookData, setData] = useState([]);
  const [activeButton, setActiveButton] = useState('technology'); // Set default active button

  const handleButtonClick = (search) => {
    setActiveButton(search); // Update active button
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}=free-ebooks&key=AIzaSyAXe21djZJT4dku_Lc8oyVmdIlS5q-KFB0`)
      .then(res => setData(res.data.items || []))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    handleButtonClick('technology'); // Call handleButtonClick with 'technology' on component mount
  }, []);

  const genreList = (
    <>
      <li>
        <button 
          onClick={() => handleButtonClick('technology')}
          className={`btn ${activeButton === 'technology' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Technology
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('poetry')}
          className={`btn ${activeButton === 'poetry' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Poetry
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('horror')}
          className={`btn ${activeButton === 'horror' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Horror
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('adventure')}
          className={`btn ${activeButton === 'adventure' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Adventure
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('biography')}
          className={`btn ${activeButton === 'biography' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Biography
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('romance')}
          className={`btn ${activeButton === 'romance' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Romance
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('science')}
          className={`btn ${activeButton === 'science' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Science
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('thriller')}
          className={`btn ${activeButton === 'thriller' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Thriller
        </button>
      </li>
      <li>
        <button 
          onClick={() => handleButtonClick('contemporary')}
          className={`btn ${activeButton === 'contemporary' ? 'bg-purple-500 text-white' : 'bg-transparent'} border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black mx-auto`}
        >
          Contemporary
        </button>
      </li>
    </>
  );

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,  background: "black",borderRadius: '60%' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,  background: "black",borderRadius: '60%'}}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-10 px-4">
      <div className="text-2xl md:text-4xl mt-20 mb-10 text-center">Our Ultimate Collection!</div>
      <div>
        <ul className="menu menu-horizontal flex justify-between mb-4">{genreList}</ul>
        
        <Slider {...settings}>
          {bookData.map((item) => (
            <Bookcard item={item} key={item.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
