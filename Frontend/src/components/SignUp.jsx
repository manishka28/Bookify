import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
function SignUp() {
  const formRef = useRef(null);

  const closeSignUpModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) modal.close();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("create");
    const passwordCheck = document.getElementById("confirm");
    
    if (nameInput && emailInput && passwordInput && passwordCheck) {
      emailInput.value = '';
      nameInput.value = '';
      emailInput.value = '';
      passwordCheck.value = '';
    }
  };
  const openLogInModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.showModal();
    const modal2 = document.getElementById("my_modal_4");
    if (modal2) modal2.close();
  };
  const handleSignUp = () => {
    openLogInModal();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal w-full">
        <div className="modal-box bg-antiquewhite dark:bg-slate-900">
          <form method="dialog">
            <button type="button" onClick={closeSignUpModal} className="btn btn-sm text-black dark:text-white btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-black dark:text-white">Sign Up</h3>
          <div className="items-center">
            <div id='name' className='mt-5 mb-2'>Name</div>
            <input className="bg-transparent w-80 px-3 h-10 border border-black dark:border-white rounded-md outline-none" type="text" placeholder='Your Name'  />
            <div id='email' className='mt-5 mb-2'>Email</div>
            <input className="bg-transparent w-80 px-3 h-10 border border-black dark:border-white rounded-md outline-none" type="email" placeholder='abc@email.com'/>
            <div id='create' className='mt-5 mb-2'>Create Password</div>
            <input className="bg-transparent w-80 h-10 px-3 border border-black dark:border-white rounded-md outline-none" type="password" />
            <div id='confirm' className='mt-5 mb-2'>Confirm Password</div>
            <input className="bg-transparent w-80 h-10 px-3 border border-black dark:border-white rounded-md outline-none" type="password" />
            <div className='flex justify-between mt-3'>
              <NavLink onClick={handleSignUp} className="btn bg-transparent border-solid border-4 border-purple-500 hover:bg-purple-500 dark:text-white dark:hover:text-black"> Sign In</NavLink>
              <div className='mt-4'> Have An Account ? <NavLink onClick={openLogInModal} className='text-purple-600'>Sign In</NavLink></div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SignUp;
