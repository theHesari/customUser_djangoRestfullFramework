// Modal.js

'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React, {useContext, useState} from "react";
import {AuthContext} from "../../AuthContext";
import Notification from "../Notification";

export default function Modal({ open, setOpen, profile}) {
  const {change_personal_information, activeForm} = useContext(AuthContext);
  const [ first_name, setFirstName ] = useState('');
  const [ last_name, setLastName ] = useState('');
  const [notification, setNotification] = useState(null);

  const handleNotify = (message, description, type) => {
    setNotification({message, description, type});
    setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
  };

  const handleSave = async () => {
    await change_personal_information(first_name, last_name, handleNotify);
    localStorage.setItem('activeForm', activeForm);
    window.location.reload();
    handleNotify("Changes applied.", "Your personal information is updated", "success")
    setOpen(false);

  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      {notification && <Notification {...notification} />}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >

            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <section className="border-b border-gray-900/10 pb-12">
                <header>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Change personal information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{profile.email}</p>
                </header>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                          id="first-name"
                          name="first-name"
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={profile.first_name}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                          id="last-name"
                          name="last-name"
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={profile.last_name}
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                  type="button"
                  onClick={() => handleSave()}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Save
              </button>
              <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
