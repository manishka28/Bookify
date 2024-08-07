import React from 'react';
import { useCart } from '../context/cart';

function CartPage() {
  const [cart, setCart] = useCart();
  console.log(cart);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach(item => {
        const amount = item.saleInfo.saleability === 'FOR_SALE' 
          ? (item.saleInfo.listPrice?.amount || 0) 
          : 0; // Set to 0 if the item is not for sale or free
        total += amount;
      });
      return total.toFixed(2); // Round to 2 decimal places
    } catch (error) {
      console.error('Error calculating total price:', error);
      return '0.00'; // Return a default value if there's an error
    }
  };

  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter(item => item.id !== pid);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <h4 className='text-center'>
        {cart.length > 1 ? `You have ${cart.length} items in your cart` : `Your cart is empty`}
      </h4>

      <div className='flex justify-around'>
        <div className='col-md-9 w-3/5'>
          <div className='text-lg font-bold mb-4'>Cart</div>
          <div className='flex-col'>
            {cart?.map(item => {
              const isFree = item.saleInfo.saleability !== 'FOR_SALE';
              const amount = isFree ? 0 : item.saleInfo.listPrice?.amount || 0;

              return (
                <div key={item.id} className='flex m-4 border p-4 rounded-lg shadow-md'>
                  <div className='w-1/3'>
                    <figure className="flex-grow-0">
                      <img className="w-full h-auto object-cover" src={item.volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'} alt={item.volumeInfo.title} />
                    </figure>
                  </div>
                  <div className='w-2/3 pl-4 flex flex-col justify-between'>
                    <div>
                      <div className="text-md font-semibold mb-2">
                        {item.volumeInfo.title}
                      </div>
                      <div className="text-sm text-purple-600 mb-2">
                        by {item.volumeInfo.authors?.join(', ')}
                      </div>
                      <button
                        className='w-full text-center bg-transparent btn btn-sm border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white dark:text-white dark:hover:text-black'
                        onClick={() => removeCartItem(item.id)}
                      >
                        Remove Item
                      </button>
                    </div>
                    <div className="text-md font-semibold mt-4">
                      ₹{amount}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-md-3 text-lg font-bold mb-4">
          <h2>Cart Summary</h2>
          <p className='mt-4'>Total | Checkout | Payment </p>
          <hr/>
          <h4 className='mt-3'>Total: ₹{totalPrice()}</h4>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
