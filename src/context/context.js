import React, {useReducer, createContext} from 'react';

import contextReducer from './contextReducer'


const initialState=JSON.parse(localStorage.getItem('transactions')) || [[{"amount":50,"type":"Expense","category":"Food","date":"2021-09-02","id":"b7c4d97a-91db-4f2d-ae13-7f290821027b"},{"amount":20,"type":"Expense","category":"Bills","date":"2021-09-16","id":"ebb1a557-aaea-4853-ad57-2cc1acdc6062"},{"amount":70,"type":"Income","category":"Lottery","date":"2021-09-16","id":"cb662546-5b7f-4808-b28f-8a2dc8fb323d"},{"amount":100,"type":"Income","category":"Deposits","date":"2021-09-20","id":"e8ea86f9-966f-46f2-b849-c3ef8af0f141"}]];
export const ExpenseTrackerContext = createContext(initialState) ;

export const Provider=({children}) =>{
    const [transactions , dispatch] = useReducer(contextReducer, initialState);
   
    const deleteTransaction = (id)=>{
        dispatch({type: 'DELETE_TRANSACTION' , payload: id});
    }

    const addTransaction= (transaction) => {
     dispatch({type: 'ADD_TRANSACTION', payload: transaction})
    }
  const balance = transactions.reduce( (acc, currVal) => currVal.type === 'Expense' ? acc = acc - currVal.amount : acc = acc + currVal.amount, 0 );
return(
<ExpenseTrackerContext.Provider value={{
    deleteTransaction,
    addTransaction,
    transactions,
    balance,
}}>
    {children}
</ExpenseTrackerContext.Provider>
);
}