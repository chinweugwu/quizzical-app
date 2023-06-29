import {useState} from 'react'

const Button = ({option, checkAnswer, correctAnswer, id}) => {

    const [isSelected, setIsSelected] = useState(true)

    function selectAnswer() {
        setIsSelected(!isSelected)   
    }
        
    const answerProps  =  ({
        value: option,
        isSelected: isSelected,
        correctAnswer: correctAnswer,
        id: id
    })
    
    return ( 
        <button
        id="choices"
        className={!isSelected ? "answer-button-clicked" : "answer-button"}
        onClick={() => {
            checkAnswer(answerProps);
            selectAnswer();}}
        >{option}</button>
    );
}
 
export default Button;