import React, { useState } from "react";
import { tx } from "@transifex/native";
import { T } from "@transifex/react";

tx.init({ token: "1/51e48ff8cd1de3a357ac4480a322c990ef5df2a5" });

const TranslationExample = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = async () => {
    try {
      const translation = await tx.translate(inputText, targetLanguage);
      setTranslatedText(translation);
      setError(null);
    } catch (error) {
      console.error("Error translating text:", error);
      setError("An error occurred while translating the text.");
    }
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>
      <select value={targetLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="ta">Tamil</option>
      </select>
      {error && <p>{error}</p>}
      <p>
        Translated Text: <T _str={translatedText} _key="TranslationText" />
      </p>
    </div>
  );
};

export default TranslationExample;
