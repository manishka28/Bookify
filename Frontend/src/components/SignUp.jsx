import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

function SignUp() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const closeSignUpModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) modal.close();
    setFormData({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrorMessage('');
  };

  const openLogInModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.showModal();
    const modal2 = document.getElementById("my_modal_4");
    if (modal2) modal2.close();
    setFormData({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage('');

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:4001/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        openLogInModal();
        setFormData({
          fullname: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        console.log(result.message);
        setErrorMessage(result.message);
        
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.response.formData.message);
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
      <dialog id="my_modal_4" className="modal w-full">
        <div className="modal-box bg-antiquewhite dark:bg-slate-900">
          <form ref={formRef} onSubmit={handleSignUp}>
            <button type="button" onClick={closeSignUpModal} className="btn btn-sm text-black dark:text-white btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg text-black dark:text-white">Sign Up</h3>
            <div className="items-center">
              {errorMessage && <div className="text-red-500 mb-3">{errorMessage}</div>}
              <div className='mt-5 mb-2'>Name</div>
              <input name="fullname" value={formData.fullname} onChange={handleChange} className="bg-transparent w-80 px-3 h-10 border border-black dark:border-white rounded-md outline-none" type="text" placeholder='Your Name' required />
              <div className='mt-5 mb-2'>Email</div>
              <input name="email" value={formData.email} onChange={handleChange} className="bg-transparent w-80 px-3 h-10 border border-black dark:border-white rounded-md outline-none" type="email" placeholder='abc@email.com'required />
              <div className='mt-5 mb-2'>Create Password</div>
              <input name="password" value={formData.password} onChange={handleChange} className="bg-transparent w-80 h-10 px-3 border border-black dark:border-white rounded-md outline-none" type="password" required />
              <div className='mt-5 mb-2'>Confirm Password</div>
              <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="bg-transparent w-80 h-10 px-3 border border-black dark:border-white rounded-md outline-none" type="password" required />
              <div className='flex justify-between mt-3'>
                <button type="submit" className="btn bg-transparent border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black">Sign Up</button>
                <div className='mt-4'> Have An Account? <NavLink onClick={openLogInModal} className='text-purple-600'>Sign In</NavLink></div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default SignUp;
