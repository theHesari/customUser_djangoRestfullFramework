'use client'


import React, {useContext} from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import {AuthContext} from "../AuthContext";
import Profile from "../components/Profile";

export default function Home() {
    const { activeForm } = useContext(AuthContext);

    return(
      <div>
        {activeForm === 'register' && <Register/>}
        {activeForm === 'login' && <Login/>}
        {activeForm === 'profile' && <Profile/>}
      </div>
    )
}
