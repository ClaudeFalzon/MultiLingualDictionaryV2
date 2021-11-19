import React, { useEffect, useState } from "react";
import Word from "./components/Word";

function App() {
  const [meaning, setMeaning] = useState(null);
  const [language, setLanguage] = useState("fr");

  const [defined, setDefined] = useState(true);

  const [loading, setLoading] = useState(true);
  /*   const [word, setWord] = useState("ben");  */

  /* const inputRef = useRef(); reference or tag  */

  const getWord = async (word) => {
    setLoading(true);
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`
    );

    const result = await response.json();
    setLoading(false);
    console.log(result);
    if (!result.title) {
      setMeaning(result);
      setDefined(true);
    } else {
      setDefined(false);
    }
  };

  /*   const searchNewWord = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== "") {
      getWord(inputRef.current.value);
    }
  }; */
  console.log(meaning);
  console.log(typeof meaning);

  useEffect(() => {
    getWord("etre");
    // eslint-disable-next-line
  }, []);

  /* useEffect(() => {
  effect
  
}, [language, meaning]) */

  return (
    <div className="App">
      {/*    <Word word={setWord}  onSearhNewWord={searchNewWord}  ref={inputRef}  /> */}

      {/*  {loading && <h3>Loading.... </h3>} */}
      {
        /* !loading && */ meaning && (
          <Word
            /*  word={word}
        setWord={setWord} */
            loading={loading}
            defined={defined}
            getWord={getWord}
            meaning={meaning}
            setMeaning={setMeaning}
            language={language}
            setLanguage={setLanguage} /* word={word} setWord={setWord} */
          />
        )
      }

      {/* <Word onSearhNewWord={searchNewWord} word={v} /> */}

      {/*   {country && <Country country={country} />}   */}
    </div>
  );
}

export default App;
