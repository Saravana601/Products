import "./App.css";
import React, { useEffect } from "react";
import { tx, t } from "@transifex/native";
import { T, useLanguages } from "@transifex/react";
import ProductTable from "./Components/ProductTable";

tx.init({
  token: "1/51e48ff8cd1de3a357ac4480a322c990ef5df2a5",
});

function App() {
  useEffect(() => {
    // const userLanguage = navigator.language || navigator.userLanguage;
    // console.log(userLanguage);
    // const supportedLocales = window.live;
    // console.log("Supported locales:", supportedLocales);
    // // window.live.setCurrentLocale(userLanguage);
    // tx.setCurrentLocale(userLanguage);
  }, []);

  const languages = useLanguages();
  const fName = "David";
  return (
    <>
      <div className="container">
        <p className="text">
          <T _str="Hello World" _key="welcome.string" />
        </p>
        <p className="text">
          <T _str="First Name" />
        </p>
        <p className="text">
          <T _str="Hi {name}" name={fName} />
        </p>
        {languages.map(({ code, name }) => (
          <button
            className="button"
            key={code}
            onClick={() => tx.setCurrentLocale(code)}
          >
            {name}{" "}
          </button>
        ))}
      </div>
      <ProductTable />
    </>
  );
}

export default App;
