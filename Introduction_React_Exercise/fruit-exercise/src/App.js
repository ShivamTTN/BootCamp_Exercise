import React, { Component } from 'react';
import './App.css';
import FruitList from './FruitComponent/Fruit';


class App extends Component {
  state = {
    fruit: [
      {name:'mango', qty:20}
    ],
    str : ''
  };
   submitClickHandler = (event) => {
    
    if(event.key ==="Enter" ||  event.type === "click")
    {
      let str = this.state.str;
    let values = str.split('-');
    if (values[0]===undefined || values[1] === undefined) //this dont allow to submit null or string without qty
    {
      return null;
    }
      
    let qtty = parseInt(values[1]);
    let fruits = {
      name: values[0], qty: qtty,
    };
    const newFruits = [...this.state.fruit];

    newFruits.push(fruits);
    this.setState({
      fruit: newFruits,
      str:''
    })
    document.getElementById('str').value = null;
    }
  }
  nameChangeHandler = (event)=>{
    
   this.setState({str:event.target.value})   
  }
  
  deleteClickHandler = (index) => {
    const originalFruit = [...this.state.fruit];
    originalFruit.splice(index,1);
    this.setState({fruit:originalFruit});
    
  }


  render() {
  
    let MyFruitList=null;
    MyFruitList = (
      <div>
        {this.state.fruit.map((item, index) => {
          return <FruitList
            key={index}
            name={item.name}
            age={item.qty}
            delete={()=>this.deleteClickHandler(index)}
          ></FruitList>
        })}
      </div>
    );
   
    return (
      <div className="App">
        <input id="str" type='text' onChange={this.nameChangeHandler} onKeyUp={this.submitClickHandler} /><br />
        <button type="submit" className='btn' onClick={this.submitClickHandler}  >SUBMIT</button>
        {MyFruitList}
        {this.state.fruit.length === 0?<h1>LIST IS EMPTY</h1>:null}
      </div>
    );
  }
}

export default App;
