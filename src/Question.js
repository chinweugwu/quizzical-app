
import Button from './Button'

const Question = ({item, checkAnswer}) => {

    const {id, correctAnswer, incorrectAnswers, question} = item;
   
    function shuffle(choice, arr) {
        let arr2 = [...arr]
        let rand = Math.floor(Math.random() * 4)
        arr2.splice(rand, 0, choice);
        return arr2
      }

    const ansArr = shuffle(correctAnswer, incorrectAnswers);
    const newArr = [...new Set(ansArr.map(item => item))];
    
    return ( 
        <div>
           <h3>{question}</h3> 
            <aside>
            {
                newArr.map((option, index) => {
                    return <Button 
                            key={index}
                            option={option}
                            correctAnswer={correctAnswer}
                            value={index}
                            checkAnswer={checkAnswer}
                            id={id}
                            />
                })
            }
            </aside>
        </div>
     );
}
 
export default Question;