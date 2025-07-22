import React, { useEffect, useMemo } from 'react';
import { useAuth } from '../context/UserContextProvider';
import { useCart } from '../context/CartProvider';

function CartPage() {
  const { cart, setCart,loading, error, removeItemFromCart,fetchCart } = useCart();
  const [user] = useAuth(); // Adjust this if your useAuth returns differently
  console.log(cart);
  

 useEffect(() => {
  if (user?._id) {
    fetchCart(); // Trigger actual fetch
  }
}, [user?._id]);


  const handleRemove = async (itemId) => {
  try {
    await removeItemFromCart(itemId);
  
  } catch (err) {
    console.error('Failed to remove item:', err);
  }
};


  const total = useMemo(() => {
    try {
      return cart?.reduce((sum, item) => {
        return sum + (
          item.saleInfo.saleability === 'FOR_SALE'
            ? item.saleInfo.listPrice?.amount || 0
            : 0
        );
      }, 0).toFixed(2);
    } catch (error) {
      console.error('Error calculating total price:', error);
      return '0.00';
    }
  }, [cart]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart!</div>;

  return (
    <div className="p-6">
      <h4 className='text-center text-2xl font-semibold mb-6'>
        {cart.length > 0 ? `You have ${cart.length} item(s) in your Reading List` : `Your Reading List is empty`}
      </h4>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Start exploring and add some books!</p>
      ) : (
        <div className='flex flex-col lg:flex-row justify-around'>
          {/* Cart Items */}
          <div className='lg:w-3/5'>
            <div className='text-lg font-bold mb-4'>Reading List</div>
            <div className='flex flex-col'>
              {cart?.map(item => {
                const isFree = item.saleInfo.saleability !== 'FOR_SALE';
                const amount = isFree ? 0 : item.saleInfo.listPrice?.amount || 0;
                const hasReaderLink = item.accessInfo?.webReaderLink;
const viewLabel = item.saleInfo.saleability === 'FOR_SALE' ? 'PREVIEW' : (item.saleInfo.saleability !== 'NOT_FOR_SALE' ? 'READ' : '');

                return (
                 <div key={item._id} className='flex m-4 border p-4 rounded-lg shadow-md'>
  <div className='w-1/3'>
    <figure>
      <img
        className="w-full h-auto object-cover"
        src={item.volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'}
        alt={item.volumeInfo.title || 'Book cover'}
      />
    </figure>
  </div>
  <div className='w-2/3 pl-4 flex flex-col justify-between'>
    <div>
      <div className="text-md font-semibold mb-2">
        {item.volumeInfo.title}
      </div>
      <div className="text-sm text-purple-600 mb-2">
        by {item.volumeInfo.authors?.join(', ') || 'Unknown Author'}
      </div>
      <div className='mb-2'>
       {viewLabel && hasReaderLink && (

  <a
    href={item.accessInfo.webReaderLink}
    target="_blank"
    rel="noopener noreferrer"
    className="w-1/2 text-center bg-transparent btn btn-sm border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-white dark:hover:text-black"
  >
    {viewLabel}
  </a>
)}
</div>
      <button
        className='w-1/2 text-center bg-transparent btn btn-sm border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-white dark:hover:text-black'
        onClick={() => handleRemove(item._id)}
      >
        Remove Item
      </button>
      

    
     


    </div>
    
 

  </div>
</div>

                );
              })}
            </div>
          </div>

          {/* Cart Summary */}
          {/* <div className="lg:w-1/4 mt-6 lg:mt-0 text-lg font-bold">
            <h2 className='text-xl mb-4'>Cart Summary</h2>
            <p className='text-base font-medium mb-2'>Total | Checkout | Payment</p>
            <hr className='mb-3' />
            <h4 className='mt-3'>Total: ₹{total}</h4>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default CartPage;
