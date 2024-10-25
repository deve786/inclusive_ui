import React, { useContext, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import All from './pages/All';
import Navbar from './components/Navbar';
import MarkdownPage from './pages/MarkdownPage';
import Login from './pages/Login';
import AppContext from './AppContext';
import ChatbotUI from './pages/ChatbotUI';
import UserManagment from './pages/UserManagment';
import './i18n';

function App() {
  const { isLoggedIn } = useContext(AppContext);
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const isAdmin = JSON.parse(localStorage.getItem('user_profile'))?.role=='Admin' ;

  return (
    <div className="App h-screen flex flex-col">
      <Router>
        {!isLoggedIn ? (
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col h-screen bg-gray-100">
                  <Navbar />
                  <Login />
                </div>
              }
            />
          </Routes>
        ) : (
          <div className="flex flex-col flex-grow h-screen">
            {/* Top Navbar */}
            <Navbar toggleSidebar={() => setIsMenuExpanded((prev) => !prev)} isMenuExpanded={isMenuExpanded} />

            {/* Sidebar and Content Container */}
            <div className="flex flex-grow">
              {/* Sidebar */}
              <Sidebar isMenuExpanded={isMenuExpanded} />

              {/* Main Content */}
              <div className="flex-grow min-h-screen overflow-y-auto  hide-scrollbar">
                <div className="md:p-5 bg-gray-50 flex-grow p-2 h-[90vh] ">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/all" element={<All />} />
                    <Route path="/document/:id" element={<MarkdownPage />} />
                    <Route path="/chat" element={<ChatbotUI />} />
                    {isAdmin?<Route path="/user" element={<UserManagment />} />:""}
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
