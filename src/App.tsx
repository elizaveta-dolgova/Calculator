import React, { useState } from 'react';
import Button from './componentns/Button';
import './App.css';

function App() {

    const [enteredValue, setEnteredValue] = useState({
    firstNum: '',
    operation: '',
    secondNum: ''
  });

    const clickNumHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const value = ev.currentTarget.dataset.value;
    if(!value) {
      return;
    }
    setEnteredValue(prevState => {  
      if(!prevState.operation) {
          return {...prevState, firstNum: prevState.firstNum + value}
      } else if (prevState.firstNum && prevState.operation) {
        return {...prevState, secondNum: prevState.secondNum + value}
      }
      else {
        return {...prevState, firstNum: value}
      }     
  })
  }

  const clickHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const value = ev.currentTarget.dataset.value;
    const firstNum = +enteredValue.firstNum;
    const secondNum = +enteredValue.secondNum;
    if(!value || !firstNum) {
      return;
    }
    if(!secondNum) {
      setEnteredValue(prevState => ({...prevState, operation: value}))
      return;
    }
    
    let result = 0;
    switch(enteredValue.operation) {
      case '+': 
        result = firstNum + secondNum;
        break;
      case '-':
        result = firstNum - secondNum;
        break;
      case '*':
        result = firstNum * secondNum;
        break;
      case '/':
        result = firstNum / secondNum;
        break;        
    }
    
    setEnteredValue({
      firstNum: result.toString(),
      operation: enteredValue.operation === '=' ? '' : value,
      secondNum: ''
    })
  }
  
  const clearHandler = () => {
    setEnteredValue({
      firstNum: '',
      operation: '',
      secondNum: ''
    })
  }
  const deleteHandler = () => {
    if(enteredValue.secondNum) {
      setEnteredValue(prevState => ({...prevState, secondNum: prevState.secondNum.slice(0, -1)}))
    }
    if(!enteredValue.secondNum && enteredValue.operation) {
      setEnteredValue(prevState => ({...prevState, operation: ''}))
    }
    if(!enteredValue.secondNum && !enteredValue.operation && enteredValue.firstNum) {
      setEnteredValue(prevState => ({...prevState, firstNum: prevState.firstNum.slice(0, -1)}))
    }
  }

  return (
    <div className='mainCard'>
    <div className='calcCard'>
      <h1>Calculator</h1>
      <div className='outputField'>
        {enteredValue.secondNum || enteredValue.firstNum || 0}
      </div>
      <div className='btnRow'>
        <Button sign='AC' onClick={clearHandler} className='btnOper zero'/>
        <Button sign='C' onClick={deleteHandler} className='btnOper'/>
        <Button sign='/' onClick={clickHandler} className='btnOper'/>
      </div>
      <div className='btnRow'>
        <Button sign='7' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='8' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='9' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='*' onClick={clickHandler} className='btnOper'/>
      </div>
      <div className='btnRow'>
        <Button sign='4' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='5' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='6' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='-' onClick={clickHandler} className='btnOper'/>
      </div>
      <div className='btnRow'>
        <Button sign='1' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='2' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='3' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='+' onClick={clickHandler} className='btnOper'/>
      </div>
      <div className='btnRow'>
        <Button sign='0' onClick={clickNumHandler} className='calcBtn zero'/>
        <Button sign='.' onClick={clickNumHandler} className='calcBtn'/>
        <Button sign='=' onClick={clickHandler} className='btnOper'/>
      </div>
      </div>
    </div>
  );
}

export default App;
