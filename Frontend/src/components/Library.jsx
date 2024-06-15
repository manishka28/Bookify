import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from './Bookcard';
import { useParams } from 'react-router-dom';

export default function Library() {
  const [bookData, setBookData] = useState([]);
  const { name } = useParams(); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm(name);
  }, [name]);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}=free-ebooks&key=AIzaSyAXe21djZJT4dku_Lc8oyVmdIlS5q-KFB0`)
        .then(res => {
          setBookData(res.data.items);
        })
        .catch(err => console.log(err));
    }
  }, [searchTerm]);
  return (
    <div>
      <h3 className="text-2xl text-center font-bold mb-4">{searchTerm.toUpperCase()}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookData.map((item) => (
          <Bookcard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
