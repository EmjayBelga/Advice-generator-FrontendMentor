import React from 'react';
import { useState, useEffect } from 'react';

function Advice() {
  const [adviceData, setAdviceData] = useState("");
  const [adviceError, setAdviceError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const getRandomAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(data => {
      setAdviceData(data.slip);
      setAdviceError(data.message);
      setIsLoading(false);
      setError("");
    })
    .catch(err => {
      setError(err.message);
      setIsLoading(false);
      setAdviceData("");
      setAdviceError("");
      console.error(err.message);
    });
  };

  useEffect(() => {
    getRandomAdvice();
  }, []);
  

  return (
    <main className="container">
      <div className="flex flex-col justify-center items-center max-w-[600px]">
        <div className="bg-[var(--dark-grayish-blue)] rounded-xl 
          flex flex-col justify-center items-center text-center py-10 px-6">
          <div className="text-sm text-[var(--neon-green)] tracking-[3px]">
              {isLoading && <span>Loading...</span>}
              {error && <span>{error}</span>}
              {adviceData && <span>ADVICE #{adviceData.id}</span>}
              {adviceError && <span>{adviceError.type}</span>}
          </div>
          <div className="text-4xl text-[var(--light-cyan)] my-10 max-w-[60ch]">
              {isLoading && <h1>Loading...</h1>}
              {adviceData && <h1>"{adviceData.advice}"</h1>}
              {adviceError && <h1>{adviceError.text}</h1>}
          </div>

          <div className="mb-6">
            <picture>
              <source 
                srcSet="../../assets/pattern-divider-desktop.svg"
                media="(min-width: 640px)"
              />
              <img 
                src="../../assets/pattern-divider-mobile.svg" 
                alt="Pattern Divider" 
              />
            </picture>
          </div>
        </div>

        <button
          onClick={getRandomAdvice} 
          className="bg-[var(--neon-green)] rounded-[50%] p-5 relative top-[-33px]
          hover:shadow-[0_0_30px_0_var(--neon-green)] hover:rotate-180 duration-[0.5s]"
        >
          <img 
            src="../../assets/icon-dice.svg" 
            alt="Dice Icon"  
          />
        </button>
      </div>
    </main>
  )
}

export default Advice;
