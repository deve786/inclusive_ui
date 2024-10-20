  import React, { useContext, useState } from 'react';
  import { HashRouter as Router, Route, Routes } from 'react-router-dom';
  import Sidebar from './components/Sidebar';
  import Dashboard from './components/Dashboard';
  import All from './pages/All';
  import Navbar from './components/Navbar';
  import MarkdownPage from './pages/MarkdownPage';
  import Login from './pages/Login';
  import AppContext from './AppContext';
  import Chatbot from './pages/Chatbot';

  function App() {
    const { isLoggedIn } = useContext(AppContext);
    const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  
    return (

      <div className="App h-screen flex flex-col">
        {
          !isLoggedIn ? (
          <Router>
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
          </Router>)
            :

            (<Router>
              <Routes>
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar toggleSidebar={() => setIsMenuExpanded(prev => !prev)} />
                      <div className="flex flex-grow">
                        <Sidebar  isMenuExpanded={isMenuExpanded} />
                        <div className="content flex-grow p-8 bg-gray-50">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/all" element={<All />} />
                            <Route path="/document/:id" element={<MarkdownPage />} />
                            <Route path="/chat" element={<Chatbot />} />
                          </Routes>
                        </div>
                      </div>
                    </>
                  }
                />
              </Routes>
            </Router>)}
      </div>

    );
  }

  export default App;
