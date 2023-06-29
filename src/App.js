import {useState, useEffect} from 'react';
import Question from './Question'
import Confetti from 'react-confetti'

const url = 'https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=5&difficulty=easy'

function App() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [final, setFinal] = useState(0)
 
  
   useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        setQuestions(data)
        setLoading(false)
    })
    setSubmitted(false)
    setFinal(0)
  }, [])

  if(loading === true) {
    return (
    <div className="App">
      <main>
        <h1 className="loading-h1">Preparing quiz questions...</h1>
      </main>
    </div>
    ) 
  }

  const tempAnswers = [];
 
  function checkAnswer(answerProps) { 
      if (answerProps.value === answerProps.correctAnswer) {
        tempAnswers.push(answerProps.id)
      }  
      return tempAnswers;
  }
  
  
      const answerCount = {};
      let finalAnswers = [];

  function submitAnswers() {
    
    for(let i = 0; i < tempAnswers.length; i++) {
      let num = tempAnswers[i]
      answerCount[num] = answerCount[num] ? answerCount[num] + 1: 1
    }

    finalAnswers = Object.values(answerCount);
    for(let i = 0; i < finalAnswers.length; i++) {
      if(finalAnswers[i] % 2 > 0) {
        setFinal(prevFinal => {
          return prevFinal + 1
        })
      }
    } 
    setSubmitted(true)  
  }
  
  function resetQuiz() {
    setSubmitted(false);
    setFinal(0);
  }

    return (
          <div className="App"> 
            {submitted && <main className = "main-submit">
              <div className="results-div"><h1 className="h1-submit">You have completed the test</h1></div> 

                {(final > 2 && final < 5) && 
                <div className="result-div">
                  <Confetti />
                  <img src="https://media.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif"
                       
                      alt="you did great"/>
                </div>}

                {final <= 2 && 
                <div className="result-div">
                  <h2>You could do better</h2>
                  <img src="https://media.giphy.com/media/3o6MbjqM1mUsaah7W0/giphy.gif" alt="do better buddy"/>
                </div>}

                {final === 5 && 
                <div className="result-div">
                  <h2>THAT'S A PERFECT SCORE!!!</h2>
                  <Confetti />
                  <img src="https://media.giphy.com/media/AqnnU75RBcIy4/giphy.gif" alt="winner-winner"/>
                </div>}

                <div className="result-div">
                  <h3>You Scored {final} out of 5</h3>
                  <button id="check-button" onClick={resetQuiz}>Reset Quiz</button>
                </div>
                
            </main>}
           
            {!submitted && <main>
              <div className="questions-page">
                {questions.map((item) => {
                  return (<section key={item.id} className="question-body">
                        <Question 
                          item={item}
                          checkAnswer={checkAnswer}
                        />
                      </section>)  
                })}
                <section className="prepare-scores">
                  <button id="check-button" onClick={submitAnswers}>Submit</button> 
                </section>
              </div>  
            </main>}
          </div>
  )
  
}

export default App;
