import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';


export default function Bookcard({ item }) {
  let amount = 'FREE';
  let view = 'READ';

  const { cart, addItemToCart } = useCart(); // Destructure addItemToCart from useCart
  // console.log(cart);
  
  const [message, setMessage] = useState('');

  const handleAddToCart = async (item) => {
    try {
      await addItemToCart(item); // Add item using context method

      // Display message
      setMessage('Item added to cart');

      // Hide the message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      setMessage('Error adding item to cart');
    }
  };

  if (item.saleInfo.saleability === 'FOR_SALE') {
    const temp = item.saleInfo.listPrice.amount;
    if (temp === 0) {
      amount = 'FREE';
    } else {
      amount = `₹${temp}`;
      view = 'PREVIEW';
    }
  } else if (item.saleInfo.saleability === 'NOT_FOR_SALE') {
    amount = 'NOT AVAILABLE';
    view = '';
  }

  return (
    <div className="w-50 h-50 md:w-70 md:h-96 m-4">
      <div className="card shadow-xl h-full flex flex-col">
        <figure className="flex-grow-0">
          <img className="w-full h-48 object-cover" src={item.volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'} alt={item.volumeInfo.title} />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="text-xl font-semibold mb-2">
              {item.volumeInfo.title}
            </div>
            <div className="text-sm text-purple-600 mb-2">
              by {item.volumeInfo.authors?.join(', ')}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">{amount}</div>
            <div className="flex flex-col gap-2">
              {(view === 'PREVIEW' || view === 'READ') && (
                <a href={item.accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-transparent btn btn-sm border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-white dark:hover:text-black">
                  {view}
                </a>
              )}
              {(view === 'PREVIEW' || view === 'READ') && (
                <>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full text-center bg-transparent btn btn-sm border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-white dark:hover:text-black"
                  >
                    ADD TO CART
                  </button>
                  {message && (
                    <div className="mt-2 text-green-600">
                      {message}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
