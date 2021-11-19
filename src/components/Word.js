import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Word.css";
import { Spinner } from "react-bootstrap";

export default function Word(props) {
  const title1 = {
    en: {
      speech: "Part of Speech: ",
      error: "No definition available. Please search another word.",
      example: " Example: ",
      origin: "Origin: ",
      phonetic: "Phonetics: "
    },
    it: {
      speech: "Parte del discorso: ",
      error: "Nessuna definizione è disponibile. Cerca un'altra parola.",
      example: " Esempio: ",
      origin: "Origine: ",
      phonetic: "Fonetica: "
    },
    fr: {
      speech: "Partie du discours: ",
      error: "Aucune définition disponible. Cherchez un autre mot.",
      example: " Example: ",
      origin: "Origine: ",
      phonetic: "Phonétique: "
    },

    de: {
      speech: "Wortart: ",
      error: "Keine Definition verfügbar. Bitte suchen Sie ein neues Wort.",
      example: " Beispiel: ",
      origin: "Wortherkunft: ",
      phonetic: "Phonetik: "
    }
  };

  const inputRef = useRef();

  const [selectLanguage, setSelectLanguage] = useState("fr");

  const searchNewWord = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== "") {
      props.getWord(inputRef.current.value);
    }
  };

  const handleLanguage = (e) => {
    console.log(e.target.value);
    setSelectLanguage(e.target.value);
  };

  const changeLanguage = (e) => {
   inputRef.current.value!=="" && props.setLanguage(selectLanguage);
  };

  console.log(props.meaning[0].meanings);
  const word = props.meaning[0].word;
  const origin = props.meaning[0].origin;
  const phonetics = props.meaning[0].phonetic;
  const audio = props.meaning[0].phonetics[0].audio;

  console.log(audio);
  console.log(origin);
  return (
    <div>
      <div>
        <form onSubmit={searchNewWord}>
          {/*   <label>
            Choose a word: */}
          <input
            className="form-item"
            ref={inputRef}
            /* onChange={getData} */
            type="text"
            value={props.word}
            name="word"
            id=""
            placeholder="Choose a word "
          />

          <select
            className="form-item"
            onChange={(e) => handleLanguage(e)}
            value={selectLanguage}
            name="languages"
            id="language-select"
          >
            <option value="fr">French</option>
            <option value="en">English</option>
            <option value="it">Italian</option>
            <option value="de">German</option>
            
          </select>

          <input
            className="form-item form-item-three"
            type="submit"
            value="Seek & you shall find"
            onClick={changeLanguage}
          />
        </form>
      </div>

      {!props.defined && (
        <p className="error">{title1[props.language].error}</p>
      )}
      {props.loading && <Spinner className="spinner" animation="border" />}

      {props.defined && !props.loading && (
        <div>
          <div className="intro">
            <h2>{word}</h2>
            <div>
              <div>
                {origin && (
                  <span className="entry">{title1[props.language].origin}</span>
                )}
                {origin}
              </div>
              <div>
                {phonetics && (
                  <span className="entry">
                    {title1[props.language].phonetic}
                  </span>
                )}{" "}
                {phonetics}
              </div>
              <div>
                {audio && (
                  <div className="audio">
                    <p className="entry">Audio:&nbsp;&nbsp; </p>
                    <audio controls src={audio}>
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                  </div>
                )}
              </div>
              <div>
                {props.meaning[0].meanings.map((currentValue) => {
                  return (
                    <div key={uuidv4()}>
                      <div>
                        <span className="entry">
                          {" "}
                          {title1[props.language].speech}
                        </span>
                        {/* {props.language == "en" ? "Part Of Speech:" : props.language == "it" ? "Parola:" : ""}  */}
                        {currentValue.partOfSpeech}
                      </div>
                      <div>
                        {currentValue.definitions.map((currentValue, index) => {
                          return (
                            <ul key={uuidv4()}>
                              <li>
                                {currentValue.definition}
                                {currentValue.example && (
                                  <span className="entry">
                                    {title1[props.language].example}
                                  </span>
                                )}{" "}
                                {currentValue.example}
                                {/*  {currentValue.example &&
                                  `${title1[props.language].example} ${
                                    currentValue.example
                                  }`}  */}
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
