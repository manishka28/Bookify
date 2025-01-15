import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { useAuth } from '../context/UserContextProvider';

function Navigation() {
  const [user, setUser] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [logoutDropdownOpen, setLogoutDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    // Theme effect
    const element = document.documentElement;
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
    // Close dropdowns on location change
    setCatalogDropdownOpen(false);
    setLogoutDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    // Implement logout logic here, e.g., clear user session
    setUser(null); // Example assuming setUser updates the user state
    // Additional logic to clear session storage, tokens, etc.
    localStorage.removeItem('Users'); 
    setLogoutDropdownOpen(false); // Close logout dropdown after logout
  };

  const navItems = (
    <>
      <li>
        <NavLink activeClassName="active" className="nav-link" exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className="nav-link" exact to="/catalog">
          Catalog
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className="nav-link" exact to="/contact">
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className="nav-link" exact to="/about">
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="max-w-screen-2xl z-50 bg-antiquewhite dark:bg-slate-900 container mx-auto sticky top-0 left-0 right-0">
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
            <ul className="menu text-white menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
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
                        <ul className="list-none grid grid-cols-2 grid-row-9">
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
                      <div className="w-1/3 p-2">
                        <h1 className="font-bold text-lg mb-2 text-center">Non-Fiction</h1>
                        <hr />
                        <ul className="list-none grid grid-cols-2 grid-row-9">
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
                      <div className="w-1/3 p-2">
                        <h1 className="font-bold text-lg mb-2 text-center">Comics & Manga</h1>
                        <hr />
                        <ul className="list-none grid grid-cols-2 grid-row-9">
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
              <NavLink activeClassName="active" exact to="/contact" className="nav-link btn btn-ghost rounded-btn dark:text-white">Contact</NavLink>
              <NavLink activeClassName="active" exact to="/about" className="nav-link btn btn-ghost rounded-btn dark:text-white">About</NavLink>
            </div>
            <div className="mt-3 mx-2">
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
            <div className="mt-3 mx-2">
              {user && user.fullname ? (
                <div className="relative">
                  <span className="cursor-pointer dark:text-white" onClick={() => setLogoutDropdownOpen(!logoutDropdownOpen)}>
                    Hi, {user.fullname}
                  </span>
                  {logoutDropdownOpen && (
                    <ul className="menu bg-black bg-opacity-90 text-white dropdown-content z-[1] p-2 shadow rounded-box mt-1">
                      <li onClick={handleLogout} className="cursor-pointer">
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink onClick={() => document.getElementById('my_modal_3').showModal()} className="mr-4 ml-2 btn w-20 btn-outline border-solid border-4px border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black">
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
