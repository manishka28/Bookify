import React from 'react';
import { NavLink } from 'react-router-dom';
import SignUp from './SignUp';

function LogIn() {
  const closeLogInModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.close();
  };

  const switchToSignUp = () => {
    closeLogInModal();
    const signUpModal = document.getElementById("my_modal_4");
    if (signUpModal) signUpModal.showModal();
  };

  const handleLogIn = () => {
    closeLogInModal();
    const emailInput = document.getElementById("login_email");
    const passwordInput = document.getElementById("login_password");
    
    if (emailInput && passwordInput) {
      emailInput.value = '';
      passwordInput.value = '';
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal w-full">
        <div className="modal-box bg-antiquewhite dark:bg-slate-900">
          <form id="login_form" method="dialog">
            <button type="button" onClick={closeLogInModal} className="btn btn-sm text-black dark:text-white btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg text-black dark:text-white">Log In</h3>
            <div className="items-center">
              <div className='mt-5 mb-2'>Email</div>
              <input id="login_email" className="bg-transparent w-80 px-3 h-10 border border-black dark:border-white rounded-md outline-none" type="email" placeholder='abc@email.com'  />
              <div className='mt-5 mb-2'>Password</div>
              <input id="login_password" className="bg-transparent w-80 h-10 px-3 border border-black dark:border-white rounded-md outline-none" type="password"  />
              <div className='flex justify-between mt-3'>
                <button onClick={handleLogIn} className="btn bg-transparent border-solid border-4 border-purple-500 hover:bg-purple-500  dark:text-white dark:hover:text-black"> Log In</button>
                <div className='mt-4'>Not Registered?  
                  <span className='text-purple-600 ml-1' >
                    <NavLink onClick={switchToSignUp}>
                      Sign Up
                    </NavLink>
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
