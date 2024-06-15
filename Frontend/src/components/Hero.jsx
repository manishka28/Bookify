import React, { useState } from "react";


const Hero = () => {
  const [search, setSearch] = useState("");

  const searchBook = (evt) => {
    if (evt.key === "Enter" && search.trim() !== "") {
      window.location.href = `/library/${search}`;
    }
  };

  return (
    <>
      <div className="relative h-[556px] z-0">
        <div className="absolute inset-0 bg-cover bg-op bg-center" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/08/07/53/79/360_F_807537945_wzZNgdoh57CtEtTwMD3XslbktsHUQaf1.jpg')" }}>
          <div className="absolute flex inset-0 bg-black opacity-20"></div>
          <div className="absolute mt-48 inset-0 flex-col items-center justify-center text-center text-white">
            <div>
              <h1 className=" font-extrabold text-6xl mb-4">Welcome to <span className="text-purple-500 text-7xl">Bookify</span></h1>
              <h1 className="text-3xl">
              Dive into Adventure, Mystery, and Imagination
              </h1>
            </div>
            <div className="form-control bg-transparent flex items-center mt-10">
            <label className="w-1/2 input bg-transparent input-bordered flex justify-between gap-2">
              <input
                type="text"
                className="w-1/2 text-lg font-extrabold bg-transparent placeholder-white"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={searchBook}
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4  mt-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
