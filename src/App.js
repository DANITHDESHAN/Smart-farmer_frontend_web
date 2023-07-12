import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useSelector } from 'react-redux';
import Spinners from './Component/Spinners';
import ProtectedRoute from './Component/ProtectedRoute';
import PublicRoute from './Component/PublicRoute';
import AddFarmer from './Pages/AddFarmer';
import Crop from './Pages/Crop';





function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
    <BrowserRouter>
    {loading ? (
          <Spinners />
        ) : (
    <Routes>
    <Route path="/" 
    element={
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    }/>
    <Route path="/add-farmer" 
    element={
      <ProtectedRoute>
        <AddFarmer/>
      </ProtectedRoute>
    }/>
    <Route path="/crop" 
    element={
      <ProtectedRoute>
        <Crop/>
      </ProtectedRoute>
    }/>
    <Route path="/login" 
    element={
      <PublicRoute>
        <Login/>
      </PublicRoute>
    }/>
    
    <Route path="/register" 
    element={
      <PublicRoute>
        <Register/>
      </PublicRoute>
    }/>
  </Routes>
    )}
    
    </BrowserRouter>
    </>
  );
}

export default App;
