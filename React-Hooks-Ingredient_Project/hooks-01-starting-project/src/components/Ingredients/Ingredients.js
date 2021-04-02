import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'
import useHttps from '../../hooks/https';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [
        ...currentIngredients,
        action.ingredient
      ]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not get there');

  }
}



const Ingredients = () => {
  const [userIngredient, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, data, error, sendReqest, reqExtra, reqIdentifier, clear } = useHttps()
  // const [userIngredient, setUserIngredient] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();


  // useEffect(() => {
  //   console.log("1")
  //   fetch('https://react-hooks-6a5f5-default-rtdb.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(res => {
  //       const loadedIngredients = [];
  //       for (const key in res) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: res[key].title,
  //           amount: res[key].amount
  //         })
  //       }
  //       setUserIngredient(loadedIngredients)
  //     })
  // }, []);

  useEffect(() => {
    // console.log("Rendering IngreDients")
    if (!isLoading && !error && reqIdentifier==='REMOVE_INGREDIENT') {
      dispatch({
        type: 'DELETE',
        id: reqExtra
      })
    }
    else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra }
      })
    }
  }, [data, reqExtra,reqIdentifier,isLoading,error])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredient(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    const body = JSON.stringify(ingredient);
    sendReqest('https://react-hooks-6a5f5-default-rtdb.firebaseio.com/ingredients.json', 'POST', body, ingredient, 'ADD_INGREDIENT')
    // setIsLoading(true);
    // dispatchHttp({ type: 'SEND' })
    // fetch('https://react-hooks-6a5f5-default-rtdb.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: {
    //     'Content-type': 'application/json'
    //   }
    // }).then(res => {
    //   // setIsLoading(false);
    //   dispatchHttp({ type: 'RESPONSE' })
    //   return res.json()
    // }).then(response => {
    //   // setUserIngredient(prevIngredient => [
    //   //   ...prevIngredient,
    //   //   { id: response.name, ...ingredient }
    //   // ]);
    //   dispatch({
    //     type: 'ADD',
    //     ingredient: { id: response.name, ...ingredient }
    //   })
    // })
  }, [sendReqest])

  const removeIngredientHandler = useCallback(id => {
    // setUserIngredient(prevIngredient => 
    //   prevIngredient.filter(ingredient => ingredient.id !== id)
    // )//DOUBT
    // console.log(id)
    // setIsLoading(true);
    // dispatchHttp({ type: 'SEND' })

    sendReqest(`https://react-hooks-6a5f5-default-rtdb.firebaseio.com/ingredients/${id}.json`, 'DELETE', null, id, 'REMOVE_INGREDIENT')

  }, [sendReqest])

 

  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={userIngredient} onRemoveItem={removeIngredientHandler} />
    )
  }, [userIngredient, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
