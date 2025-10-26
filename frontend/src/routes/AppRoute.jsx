import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/general/Home';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Dashboard from '../pages/general/Dashboard';

import Profile from '../pages/general/Profile';
import FoodPartnerProfile from '../pages/foodPartner/FoodPartnerProfile';
const AppRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="/createfood" element={<FoodPartnerProfile />} />
                 <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

                <Route path="/saved" element={<h1>Saved Items</h1>} />
                <Route path="/create-food" element={<h1>Create Food</h1>} />
               
            </Routes>
        </Router>
    )
}

export default  AppRoute