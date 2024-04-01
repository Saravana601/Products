import React, { useState, useEffect } from "react";
import "./App.css";
import ProductTable from "./Components/ProductTable";
import Cookies from "js-cookie";

function App() {
  const [language, setLanguage] = useState("en");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    const savedLanguage = Cookies.get("preferredLanguage");
    console.log(window.Transifex.live);

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    Cookies.set("preferredLanguage", selectedLanguage, { expires: 365 });
    setShowLanguageSelector(false);
  };

  const toggleLanguageSelector = () => {
    setShowLanguageSelector(!showLanguageSelector);
  };

  return (
    <>
      <div className="language-setting">
        <span className="settings-icon" onClick={toggleLanguageSelector}>
          ⚙️
        </span>
        {showLanguageSelector && (
          <div className="language-selector">
            <h4>Choose Your Default Language:</h4>
            <select
              value={language}
              onChange={(e) => handleChangeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="fr">Français (French)</option>
            </select>
          </div>
        )}
      </div>
      <div className="container">
        <p className="text">Product Details</p>
      </div>
      <ProductTable />
    </>
  );
}

export default App;
