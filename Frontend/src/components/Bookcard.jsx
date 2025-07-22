import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';
import { useAuth } from '../context/UserContextProvider';


export default function Bookcard({ item }) {
  let amount = 'FREE';
  let view = 'READ';

  const { cart, addItemToCart } = useCart();
  const [user, setUser] = useAuth();
  const [isError,setIsError]=useState(false);
  
  const [message, setMessage] = useState('');
function sanitizeBookForCart(item, userId) {
  return {
    userId,
    id: item.id,
    volumeInfo: {
      title: item.volumeInfo?.title || 'No Title',
      authors: item.volumeInfo?.authors || [],
      publisher: item.volumeInfo?.publisher || '',
      publishedDate: item.volumeInfo?.publishedDate ? new Date(item.volumeInfo.publishedDate) : null,
      description: item.volumeInfo?.description || '',
      imageLinks: {
        smallThumbnail: item.volumeInfo?.imageLinks?.smallThumbnail || '',
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail || '',
      },
    },
    saleInfo: {
      saleability: ['FOR_SALE', 'NOT_FOR_SALE'].includes(item.saleInfo?.saleability)
        ? item.saleInfo.saleability
        : 'NOT_FOR_SALE',
      listPrice: {
        amount: item.saleInfo?.listPrice?.amount ?? 0,
        currencyCode: item.saleInfo?.listPrice?.currencyCode || 'INR',
      }
    },
    accessInfo: {
    webReaderLink: item.accessInfo?.webReaderLink || ''
  }
  };
}

 const handleAddToCart = async (item) => {
  try {
  const sanitizedItem = sanitizeBookForCart(item, user._id);
    await addItemToCart(sanitizedItem);

   
    setMessage('Item added to cart');
  } catch (err) {
    setIsError(true);
    console.log(err);
    
    setMessage(err?.response?.data?.message || 'Error adding item to cart');
  }

  setTimeout(() => {
    setMessage('');
    setIsError(false);
  }, 3000);
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
  <div>
    {user && user.fullname ? (
      <>
        <button 
          onClick={() => handleAddToCart(item)}
          className="w-full text-center bg-transparent btn btn-sm border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-white dark:hover:text-black"
        >
          ADD TO LIST
        </button>
        {message && (
          <div className="mt-2 "  style={{ color: isError ? 'red' : 'green' }}>
            {message}
          </div>
        )}
      </>
    ) : (
      <button 
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className="w-full text-center bg-transparent btn btn-sm border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-white dark:hover:text-black"
      >
        ADD TO LIST
      </button>
    )}
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
