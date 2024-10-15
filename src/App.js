import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import All from './pages/All';
import Navbar from './components/Navbar';
import MarkdownPage from './pages/MarkdownPage';
import Login from './pages/Login';

function App() {
  return (
    <div className="App h-screen flex flex-col">
      {/* Define Routes for different pages */}
      <Routes>
        <Route 
          path="/login" 
          element={
            <div className="flex flex-col h-screen bg-gray-100">
              <Navbar />
              <Login />
            </div>
          } 
        />
        {/* Private routes, only accessible when logged in */}
        <Route 
          path="/*" 
          element={
            <>
              <Navbar />
              <div className="flex flex-grow">
                
                <Sidebar />
                <div className="content flex-grow p-8 bg-gray-50">
                  
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/all" element={<All />} />
                    <Route path="/product/:id" element={<MarkdownPage />} />
                  </Routes>
                </div>
              </div>
            </>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
