import React from "react"
import { languages } from "./lenguages"
import { Chip } from "./chip"
import { useState } from "react";
import clsx from "clsx";
import { getFarewellText } from "./utils";
import { getRandomWord } from "./utils";
import Confetti from "react-confetti"


export default function Hangman() {
  const [currentWord,setCurrentWord]= useState(()=> getRandomWord());
  const [guessedLetters,setGuessedLetters] = useState([]);

  const languagesArray = languages;
  const currentWordArray = currentWord.split("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let wrongGuesses = 0 ;
  wrongGuessesFunc();
  const gameWon = currentWordArray.every((letter) => guessedLetters.includes(letter));
  const gameLost = wrongGuesses>=languagesArray.length-1;


  function guessLetter(letter){
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? 
          prevLetters : 
          [...prevLetters, letter]
  )
  }
  function wrongGuessesFunc(){
    wrongGuesses = guessedLetters.reduce((acc, letter) => {
      return currentWord.includes(letter) ? acc : acc + 1; 
    }, 0);
  }

  function lastWasWrong(){
    return !currentWordArray.includes(guessedLetters[guessedLetters.length-1]);
  }

  function newGame(){
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  const gameStatusClass = clsx("gameStatus", {
    won: gameWon,
    lost: gameLost
})
  
    return (
        <main>
          {gameWon && <Confetti/>}
          <div className="explanation">
          <h1>Assembly: Endgame</h1>
          <h2> Guess the word in under 8 attempts to keep the programming world safe from assembly!</h2>
            </div>
            <div className ={gameStatusClass}>

             
              <h1> {gameWon? "You Win" : gameLost? "You Lose": " "}</h1>
              <h2>{gameWon? "Nice Job" : gameLost? "Better start learning assembly": " "}</h2>
              <h2> {lastWasWrong()? guessedLetters.length>0? getFarewellText(languagesArray[wrongGuesses-1].name): " " : " "}</h2>
           
            </div>

            <div className = "languages">
              { languagesArray.map((leng,index)=> (<Chip key ={leng.name} name = {leng.name} backgroundColor={leng.backgroundColor} color={leng.color} 
              dead = {index < wrongGuesses}
              />))
              }
              </div>

            <div className = "currentWord">
            {  currentWordArray.map((letter, index) => (<span key={index}>{ (gameLost || guessedLetters.includes(letter))? letter.toUpperCase() : ""  } </span>))   }
            </div>

            <div className="keyboard">
            { alphabet.map((letter,index) => (
               <button  className={clsx("letterbutton", {
                "letterright": guessedLetters.includes(letter) && currentWord.includes(letter),     
                "letterwrong": guessedLetters.includes(letter) && !currentWord.includes(letter),   
              })} 
               key={letter} onClick={ gameWon? null : gameLost? null: () => guessLetter(letter)  }> {letter.toUpperCase()} </button> )    
                   )
            }
            </div>
            {(gameWon || gameLost)? 
            <button className="new-game" onClick={newGame}>New Game</button> : ""}
         </main>
    )
}
