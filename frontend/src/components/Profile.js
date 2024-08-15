// UserLogin.js
import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from "../AuthContext";
import Notification from "./Notification";
import PopupPI from "./popups/PopupPI"
import PopupCP from "./popups/PopupCP"
const Profile = () => {

  const [notification, setNotification] = useState(null);
  const { fetchProfile, profile, isAuthenticated, showRegisterForm, showLoginForm, logout } = useContext(AuthContext);
  const [openPI, setPIOpen] = useState(false);
  const [openCP, setCPOpen] = useState(false);

  const handleRegisterClick = (e) => {
    e.preventDefault(); // Prevents the default anchor behavior
    showRegisterForm();
  };

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevents the default anchor behavior
    showLoginForm();
  };

  const handleLogout = async () => {
    logout(handleNotify)
  };
  useEffect(() => {
    if (isAuthenticated && !profile) {
      // Fetch profile only if user is authenticated and profile is not yet loaded
      fetchProfile();
    }
  }, [isAuthenticated, profile, fetchProfile]);

  if (!isAuthenticated || !profile) {
    return(
        <div className="flex items-center justify-center min-h-screen p-1.5">
          {notification && <Notification {...notification} />}
          <div className="w-full max-w-6xl h-auto bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="md:flex">
              <div className="md:shrink-0">
                <img className="w-full h-96 object-cover md:h-full md:w-96"
                     src="https://t.ly/SKxzE"/>

              </div>
              <div className="p-8 flex-1 content-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="pb-8 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">Ooops!</h2>
                  <p className="pb-8 block text-gray-700 text-lg font-medium leading-6">It looks like you ae trying to reach to your profile, but it seems like you are not logged in.</p>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="flex items-center justify-start gap-x-5">
                    <button
                        type="submit"
                        onClick={handleRegisterClick}
                        className="bg-transparent hover:bg-amber-500 text-amber-500 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded-full">
                      Register
                    </button>
                    <div className="justify-center gap-3">
                      <a href=""
                         onClick={handleLoginClick}
                         className="inline-flex items-center font-semibold text-amber-600 dark:text-amber-500 hover:underline">
                        Login
                        <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  const handleNotify = (message, description, type) => {
    setNotification({message, description, type});
    setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
  };


  return (
      <div>

        <div className="flex items-center justify-center min-h-screen p-1.5">
          {notification && <Notification {...notification} />}
          <div className="w-full max-w-6xl h-auto bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="md:flex">
              <div className="md:shrink-0">
                <img className="w-full h-96 object-cover md:h-full md:w-96"
                     src="https://t.ly/rHplm"/>
              </div>
              <div className="p-8 flex-1">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <section className="border-b border-gray-900/10 pb-12 pt-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Welcome Back </h2>
                    <h2 className="text-base font-normal leading-7 text-gray-600">{profile.email}</h2>
                  </section>
                  <section className="flex border-b border-gray-900/10 pb-12 pt-12 justify-between">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                      <h2 className="text-base font-normal leading-7 text-gray-600">{profile.first_name} {profile.last_name}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => setPIOpen(true)}
                        className="rounded-md bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                    >
                      Edit
                    </button>
                    <PopupPI open={openPI} setOpen={setPIOpen} profile={profile}/>
                  </section>
                  <section className="flex border-b border-gray-900/10 pb-12 pt-12 justify-between">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Security</h2>
                      <h2 className="text-base font-normal leading-7 text-gray-600">you can change your password</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => setCPOpen(true)}
                        className="rounded-md bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                    >
                      Edit
                    </button>
                    <PopupCP open={openCP} setOpen={setCPOpen} profile={profile}/>
                  </section>
                  <div className="py-3 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        onClick={() => handleLogout()}
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );

};

export default Profile;
