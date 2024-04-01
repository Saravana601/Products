import React, { useEffect } from "react";
import { tx } from "@transifex/native";

function LanguageSelector() {
  useEffect(() => {
    const initializeTransifex = async () => {
      try {
        await tx.init({ token: "1/51e48ff8cd1de3a357ac4480a322c990ef5df2a5" });

        tx.live.onFetchLanguages(function (languages) {
          const handleLanguageSelection = (code) => {
            tx.live.translateTo(code, true);
          };

          languages.forEach((language) => {
            const languageOption = document.createElement("option");
            languageOption.value = language.code;
            languageOption.text = language.name;
            languageOption.addEventListener("click", () =>
              handleLanguageSelection(language.code)
            );
            document
              .getElementById("language-select")
              .appendChild(languageOption);
          });
        });
      } catch (error) {
        console.error("Error initializing Transifex Live:", error);
      }
    };

    initializeTransifex();
  }, []);

  return (
    <select id="language-select">
      <option value="en">English</option>
      <option value="hi">Hindi</option>
    </select>
  );
}

export default LanguageSelector;
