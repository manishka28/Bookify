import React, { useState, useEffect,useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { useAuth } from '../context/UserContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartProvider';
// import { useCart } from '../context/cart';


function Navigation() {
  const [user, setUser] = useAuth();

  // console.log(`USER: ${user._id}`);
  
  const [logoutDropdownOpen, setLogoutDropdownOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [mobileCatalogDropdownOpen, setMobileCatalogDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const element = document.documentElement;

  // const [cart]=useCart();

  const dropdownRef = useRef(null);
  

  // Cart SYstem 
  const { cart, setCart, loading, error } = useCart();

  useEffect(() => {
    if (user && user._id) {
      console.log('Fetching cart items for user:', user);
      // The CartProvider will handle fetching the cart data
    } else {
      console.log('No user is logged in. Skipping cart fetch.');
    }
  }, [user, setCart]);

  const saveCartItems = (updatedCart) => {
    console.log('Saving updated cart:', updatedCart);
    setCart(updatedCart); // Update cart in CartProvider
  };

  // useEffect(() => {
  //   // Fetch the cart from local storage
  //   const savedCart = localStorage.getItem('cart');
  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart));
  //   }
  // }, []);




  const fictionCategories = [
    'adventure', 'classics', 'crime', 'fairy-tales-fables-and-folk-tales', 'fantasy', 'historical-fiction',
    'horror', 'humour-and-satire', 'literary-fiction', 'mystery', 'poetry', 'plays', 'romance',
    'science-fiction', 'short-stories', 'thrillers', 'war', 'womens-fiction', 'young-adult', 'contemproary'
  ];

  const nonFictionCategories = [
    'biography', 'essay', 'journalism', 'memoir', 'self-help', 'true-crime', 'business-management',
    'health-fitness', 'sprituality', 'philosophy', 'history', 'travel-holiday', 'science-nature',
    'sports', 'dictionary-reference', 'stock-market', 'technology'
  ];

  const comicCategories = ['indian-comics', 'american-comics', 'manga'];

  const fictionLabels = [
    'Adventure stories', 'Classics', 'Crime', 'Fairy tales,fables, and folk tales', 'Fantasy', 'Historical fiction',
    'Horror', 'Humour and satire', 'Literary fiction', 'Mystery', 'Poetry', 'Plays', 'Romance',
    'Science fiction', 'Short stories', 'Thrillers', 'War', 'Women’s fiction', 'Young adult', 'Contemproary'
  ];

  const nonFictionLabels = [
    'Biography', 'Essay', 'Journalism', 'Memoir', 'Self-help', 'True crime', 'Business & Management',
    'Health & Fitness', 'Sprituality', 'Philosophy', 'History', 'Travel & Holiday', 'Science & Nature',
    'Sports', 'Dictionary & Reference', 'Stock Market', 'Technology'
  ];

  const comicLabels = ['Indian Comics', 'American Comics', 'Manga'];

  useEffect(() => {
    if (theme === 'dark') {
      element.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
    } else {
      element.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    console.log("Location changed, closing all dropdowns");
    setDropdownOpen(false); // Ensure these state setters are defined
    setCatalogDropdownOpen(false);
    setLogoutDropdownOpen(false);
    setMobileCatalogDropdownOpen(false);
  }, [location]);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("Click outside detected");
        setMobileCatalogDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listener on component unmount
    return () => {
      console.log("Cleaning up event listener");
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle dropdown open/close and page scroll
  useEffect(() => {
    console.log("Mobile catalog dropdown state changed:", mobileCatalogDropdownOpen);
    if (mobileCatalogDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup to reset body overflow when component unmounts or when dropdown closes
    return () => {
      console.log("Cleaning up body overflow");
      document.body.style.overflow = '';
    };
  }, [mobileCatalogDropdownOpen]);

  const handleToggleDropdown = () => {
    setMobileCatalogDropdownOpen(prevState => !prevState);
    console.log(`Toggling mobile dropdown state to ${!mobileCatalogDropdownOpen}`);
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('Users'); 
    setLogoutDropdownOpen(false);
    // Additional logic to clear session storage, tokens, etc.
  };

  const navItems = (
    <>
      <li>
        <NavLink activeClassName="active" className="nav-link" exact to="/">Home</NavLink>
      </li>
      <li>
        <div className="nav-link" onClick={handleToggleDropdown}>Catalog</div>
      </li>
      <li>
        <NavLink activeClassName="active" className="nav-link" exact to="/contact">Purchases</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className="nav-link" exact to="/about">About</NavLink>
      </li>
    </>
  );

  return (
    <div className='max-w-full z-50 bg-antiquewhite dark:bg-slate-900 container mx-auto sticky top-0 left-0 right-0'>
      <div className="navbar dark:text-white">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {dropdownOpen && (
            <ul tabIndex={0} className="menu text-white menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
            </ul>
          )}
    {mobileCatalogDropdownOpen && (
        <ul className="menu bg-black bg-opacity-90 text-white dropdown-content z-[1] p-2 shadow rounded-box w-screen absolute top-full left-0 mt-4 mb-5 max-h-[100vh] overflow-y-auto">
          <div className='flex flex-col w-full'>
            <div className="w-full p-2">
              <h1 className="font-bold text-lg mb-2 text-center">Fiction</h1>
              <hr />
              <ul className="list-none grid grid-cols-2 gap-2">
                {fictionCategories.map((category, index) => (
                  <li key={category} className="w-full text-sm p-1">
                    <NavLink
                      exact
                      to={`/library/${category}`}
                      className="btn text-md font-light bg-transparent border-none mx-auto"
                      style={{ color: 'white' }}
                    >
                      {fictionLabels[index]}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full p-2">
              <h1 className="font-bold text-lg mb-2 text-center">Non-Fiction</h1>
              <hr />
              <ul className="list-none grid grid-cols-2 gap-2">
                {nonFictionCategories.map((category, index) => (
                  <li key={category} className="w-full text-sm p-1">
                    <NavLink
                      exact
                      to={`/library/${category}`}
                      className="btn text-md bg-transparent border-none mx-auto"
                      style={{ color: 'white' }}
                    >
                      {nonFictionLabels[index]}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full p-2">
              <h1 className="font-bold text-lg mb-2 text-center">Comics & Manga</h1>
              <hr />
              <ul className="list-none grid grid-cols-2 gap-2">
                {comicCategories.map((category, index) => (
                  <li key={category} className="w-full text-sm p-1">
                    <NavLink
                      exact
                      to={`/library/${category}`}
                      className="btn text-md bg-transparent border-none mx-auto"
                      style={{ color: 'white' }}
                    >
                      {comicLabels[index]}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ul>
      )}
        </div>
        <div className="flex-1 px-2 lg:flex-none dark:text-white">
          <img src='./images/logo.png' alt='Bookify' className='h-10' />
        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch dark:text-white">
            <div className="navbar-center hidden lg:flex">
              <NavLink activeClassName="active" exact to="/" className="nav-link btn btn-ghost dark:text-white rounded-btn">Home</NavLink>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost rounded-btn dark:text-white"
                  onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
                >
                  Catalog
                </div>
                {catalogDropdownOpen && (
                  <ul className="menu bg-black bg-opacity-90 h-[550px] text-white dropdown-content z-[1] p-2 shadow rounded-box w-[900px] mt-4 mx-5 mb-5">
                    <div className='flex flex-wrap w-full'>
                      <div className="w-1/3 p-2">
                        <h1 className="font-bold text-lg mb-2 text-center">Fiction</h1>
                        <hr />
                        <
ul className="list-none grid grid-cols-2 lg:grid-cols-1">
                          {fictionCategories.map((category, index) => (
                            <li key={category} className="w-full text-sm p-1">
                              <NavLink
                                exact
                                to={`/library/${category}`}
                                className="btn text-md font-light bg-transparent border-none mx-auto"
                                style={{ color: 'white' }}
                              >
                                {fictionLabels[index]}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full lg:w-1/3 p-2">
                        <h1 className="font-bold text-lg mb-2 text-center">Non-Fiction</h1>
                        <hr />
                        <ul className="list-none grid grid-cols-2 lg:grid-cols-1">
                          {nonFictionCategories.map((category, index) => (
                            <li key={category} className="w-full text-sm p-1">
                              <NavLink
                                exact
                                to={`/library/${category}`}
                                className="btn text-md bg-transparent border-none mx-auto"
                                style={{ color: 'white' }}
                              >
                                {nonFictionLabels[index]}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full lg:w-1/3 p-2">
                        <h1 className="font-bold text-lg mb-2 text-center">Comics & Manga</h1>
                        <hr />
                        <ul className="list-none grid grid-cols-2 lg:grid-cols-1">
                          {comicCategories.map((category, index) => (
                            <li key={category} className="w-full text-sm p-1">
                              <NavLink
                                exact
                                to={`/library/${category}`}
                                className="btn text-md bg-transparent border-none mx-auto"
                                style={{ color: 'white' }}
                              >
                                {comicLabels[index]}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ul>
                )}
              </div>
              <div>
                {user && user.fullname ? (
<NavLink exact to="/purchases" className="nav-link btn btn-ghost dark:text-white rounded-btn">Purchases</NavLink>
      ) : (
        <NavLink exact to="/purchases" className="nav-link btn btn-ghost dark:text-white rounded-btn" activeClassName="active" onClick={() => document.getElementById("my_modal_3").showModal()}>Purchases</NavLink>
        
      )}
    </div>
              
            </div>
            <div className='mt-3 mx-2'>
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  className="theme-controller"
                />
                <svg
                  className="swap-off fill-current w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-on fill-current w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
            <div className='mt-1 mx-2'>
      {user && user.fullname ? (
        <div className="relative">
        <NavLink exact to="/cart" className="relative">
          <FontAwesomeIcon className='mt-4' icon={faShoppingCart} size="xl" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {cart.length}
            </span>
          )}
        </NavLink>
      </div>
      ) : (
        <span
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="cursor-pointer dark:text-white"
        >
          <FontAwesomeIcon className='mt-2' icon={faShoppingCart} size="xl" />
        </span>
      )}
    </div>
            <div className='mt-1 mx-2'>
  {user && user.fullname ? (
    <div className='relative'>
      <span className="cursor-pointer dark:text-white" onClick={() => setLogoutDropdownOpen(!logoutDropdownOpen)}>
        {user.fullname}
      </span>
      {logoutDropdownOpen && (
        <ul className="menu absolute bg-black bg-opacity-50 text-white dropdown-content z-[1] shadow rounded-box right-0 mt-2">
          <li onClick={handleLogout} className="cursor-pointer m-2">Logout</li>
          <li className="cursor-pointer m-2">Settings</li>
        </ul>
      )}
    </div>
  ) : (
    <NavLink onClick={() => document.getElementById("my_modal_3").showModal()} className="mr-4 ml-2 btn w-20 btn-outline border-solid border-4px border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black">
      Log In
    </NavLink>
  )}
  <LogIn />
  <SignUp />
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
