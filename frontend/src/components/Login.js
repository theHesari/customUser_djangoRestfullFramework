// UserLogin.js
import React, { useContext, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Notification from "./Notification";


const UserLogin = () => {

  const {login, showRegisterForm} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const handleRegisterClick = (e) => {
    e.preventDefault(); // Prevents the default anchor behavior
    showRegisterForm();
  };

  const handleNotify = (message, description, type) => {
    setNotification({message, description, type});
    setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(email, password, handleNotify)
    };

  return (
      <div>

        <div className="flex items-center justify-center min-h-screen p-1.5">
          {notification && <Notification {...notification} />}
          <div className="w-full max-w-6xl h-auto bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="md:flex">
              <div className="md:shrink-0">
                <img className="w-full h-96 object-cover md:h-full md:w-96"
                    src="https://t.ly/aeR3n"/>
                </div>

              {/* Login form */}
              <div className="p-8 flex-1">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to
                    your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium leading-6" htmlFor="email">
                        Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                          required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium leading-6" htmlFor="password">
                        Password
                      </label>
                      <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                          required
                      />
                      <div className="text-sm mt-2">
                        <a href="#" className="font-semibold text-amber-600 hover:text-amber-500">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="" onClick={handleRegisterClick} className="font-semibold leading-6 text-amber-600 hover:text-amber-500">
                      Create your account now
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );

};

export default UserLogin;
