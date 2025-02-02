import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const App = () => {
  const defaultColor = '#aeaeae';
  const [settings] = useState({
    themeColor: defaultColor,
    language: 'pt-br',
  });

  useEffect(() => {
    document.body.style.backgroundColor = settings.themeColor;
  }, [settings.themeColor]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard settings={settings} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;