'use client'

import {useContext, useState} from 'react'
import {
  Dialog,
  DialogPanel,
  Menu, MenuButton, MenuItem, MenuItems,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {AuthContext} from "../AuthContext";




export default function Navbar({ setActiveForm }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { showRegisterForm, showLoginForm, showProfile } = useContext(AuthContext);
  const [notification, setNotification] = useState(null);

  const handleRegisterClick = (e) => {
    e.preventDefault(); // Prevents the default anchor behavior
    showRegisterForm();
  };

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevents the default anchor behavior
    showLoginForm();
  };

  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevents the default anchor behavior
    showProfile();
  };

  const handleNotify = (message, description, type) => {
    setNotification({ message, description, type });
    setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
  };

  const handleLogout = async () => {
    logout(handleNotify)
  };


  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=amber&shade=500" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {!isAuthenticated ? (
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <a href="" onClick={handleRegisterClick} className="text-sm font-iranyekan leading-6 text-gray-900">
              Register
            </a>
            <a href="" onClick={handleLoginClick} className="text-sm font-iranyekan leading-6 text-gray-900">
              Login
            </a>
          </PopoverGroup>
          ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton
                    className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                  <span className="absolute -inset-1.5"/>
                  <span className="sr-only">Open user menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                       stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                  </svg>

                </MenuButton>
              </div>
              <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="" onClick={handleProfileClick} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        )}
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10"/>
        <DialogPanel
            className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                <a href="/profile/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                  Your Profile
                </a>
                <a href="/profile/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                  Setting
                </a>
              </div>

              <div className="py-6">
                <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
