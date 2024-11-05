import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SignUp from './SignUp';
// import UserContext from '../context/UserContext';

function LogIn() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  // const {setUser}=useContext(UserContext)
  const closeLogInModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.close();
    setFormData({
      email: '',
      password: '',
    });
    setErrorMessage('');
  };

  const switchToSignUp = () => {
    closeLogInModal();
    const signUpModal = document.getElementById("my_modal_4");
    if (signUpModal) signUpModal.showModal();
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      let result;
      try {
        result = await response.json();
      } catch (e) {
        throw new Error('Internal Server Error');
      }

      if (response.ok) {
        
        setFormData({
          email: '',
          password: '',
        });
        if (formRef.current) {
          formRef.current.reset();
        }
        console.log('Login successful:', result.message || 'Logged in successfully!');
        closeLogInModal();
        localStorage.setItem("Users", JSON.stringify(result.user));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // setUser({ fullname: result.user.fullname, email: result.user.email });
      } else {
        console.log('Error:', result.message);
        setErrorMessage(result.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal w-full">
        <div className="modal-box bg-antiquewhite dark:bg-slate-900">
          <form id="login_form" ref={formRef} onSubmit={handleLogIn} method="dialog">
            <button type="button" onClick={closeLogInModal} className="btn btn-sm text-black dark:text-white btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg text-black dark:text-white">Log In</h3>
            <div className="items-center">
              {errorMessage && <div className="text-red-500 mb-3">{errorMessage}</div>}
              <div className='mt-5 mb-2'>Email</div>
              <input 
                id="login_email" 
                name="email" 
                className="bg-transparent w-80 px-3 h-10 border border-black dark:border-white rounded-md outline-none" 
                type="email" 
                placeholder='abc@email.com' 
                value={formData.email} 
                onChange={handleChange}  required 
              />
              <div className='mt-5 mb-2'>Password</div>
              <input 
                id="login_password" 
                name="password" 
                className="bg-transparent w-80 h-10 px-3 border border-black dark:border-white rounded-md outline-none" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <div className='flex justify-between mt-3'>
                <button type="submit" className="btn bg-transparent border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black">Log In</button>
                <div className='mt-4'>Not Registered?  
                  <span className='text-purple-600 ml-1'>
                    <NavLink onClick={switchToSignUp}>Sign Up</NavLink>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
      <SignUp />
    </div>
  );
}

export default LogIn;
