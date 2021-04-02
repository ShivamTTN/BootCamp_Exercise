import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator'
import './IngredientForm.css';

const IngredientForm = React.memo(props => {


  const [formTitle, setFormTitle] = useState('');
  const [formAmt, setFormAmt] = useState('');
  console.log("Inside Ingredient Form")
  const submitHandler = event => {
    event.preventDefault();
    // ...
    props.onAddIngredient({
      title: formTitle,
      amount: formAmt
    });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={formTitle}
              onChange={event => {
                setFormTitle(event.target.value)
              }} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={formAmt}
              onChange={event => {
                setFormAmt(event.target.value)
              }} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
