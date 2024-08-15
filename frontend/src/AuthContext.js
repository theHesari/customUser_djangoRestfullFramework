import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
const [activeForm, setActiveForm] = useState(() => {
    // Load from localStorage if available
    return localStorage.getItem('activeForm') || 'register';
  });

useEffect(() => {
    // Save to localStorage whenever activeForm changes
    localStorage.setItem('activeForm', activeForm);
  }, [activeForm]);


  const showRegisterForm = () => setActiveForm('register');
  const showLoginForm = () => setActiveForm('login');
  const showProfile = () => setActiveForm('profile');


  const register = async (formData, handleNotify) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setActiveForm('login')
        handleNotify('Registration Successful', 'You created your account successfully!', 'success');
        // showLoginForm;
      } else {
        window.location.reload();
        handleNotify('Something went wrong.', 'Failed to create your account', 'error');
      }
    } catch (error) {
      window.location.reload();
    }
  }

  const login = async (email, password, handleNotify) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {

        localStorage.setItem('accessToken', data['tokens']['access']);
        localStorage.setItem('refreshToken', data['tokens']['refresh']);
        setIsAuthenticated(true)
        // await fetchProfile()
        handleNotify('Login Successful', 'You have been logged in successfully!', 'success');
        setActiveForm('profile')
      } else {
        // setError(data.detail || 'Login failed');
        handleNotify('Login Failed', 'Login failed', 'error');
        window.location.reload();
      }
    } catch (error) {
      handleNotify('Login Failed', 'Login failed', 'error');
      window.location.reload();
    }
  };


  const logout = async (handleNotify) => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    try {
      await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      handleNotify('Logged out Successful', 'You have been logged out successfully!', 'success');
      setActiveForm('login')
    } catch (error) {
      handleNotify('Log out Failed', 'Log out failed', 'error');
    }
  };


  const change_personal_information = async(first_name, last_name, handleNotify) => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    try {
      await fetch("http://127.0.0.1:8000/api/change_personal_information/", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          first_name: first_name || profile.first_name,
          last_name: last_name || profile.last_name })
      })
      // handleNotify('Changes applied', 'Changed persona information successfully!', 'success');
      setActiveForm('profile')
    } catch (error) {
      // handleNotify('Something went wrong.', 'Failed to update personal information', 'error');
    }
  };

  const change_password = async (password, password2, handleNotify) => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if ( password && password === password2 ){
      try {
      await fetch("http://127.0.0.1:8000/api/change_password/", {
      method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          password: password,
          password2: password2}),
      })
      handleNotify('Changes applied', 'Changed password successfully!', 'success');
      await logout();
      setActiveForm('login')
    } catch (error) {
      handleNotify('Something went wrong.', 'Failed to update password', 'error');
      // navigate(0)
    }
    }else{
      handleNotify('Something went wrong.', 'Failed to update password', 'error');
      // navigate(0)
    }
  };

  const [profile, setProfile] = useState(null);
  const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);  // Set profile data to state
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('An error occurred while fetching profile data:', error);
      }
    };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, change_personal_information, change_password, showRegisterForm,
      showLoginForm, showProfile, activeForm, setActiveForm, fetchProfile, profile, register}}>
      {children}
    </AuthContext.Provider>
  );
};
