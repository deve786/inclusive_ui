import React, { useContext } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import All from './pages/All';
import Navbar from './components/Navbar';
import MarkdownPage from './pages/MarkdownPage';
import Login from './pages/Login';
import AppContext from './AppContext';

function App() {
  const { isLoggedIn } = useContext(AppContext);
 
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
                    <Navbar />
                    <div className="flex flex-grow">
                      <Sidebar />
                      <div className="content flex-grow p-8 bg-gray-50">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/all" element={<All />} />
                          <Route path="/document/:id" element={<MarkdownPage />} />
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
