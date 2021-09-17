import { useContext } from "react";

import { ExpenseTrackerContext } from "./context/context";
import { incomeCategories, expenseCategories, resetCategories } from "./constants/categories";


const useTransaction = (title) => {
    resetCategories();
    const {transactions} = useContext(ExpenseTrackerContext);
    const transactionType = transactions.filter( (t) => t.type === title);
    const total = transactionType.reduce( (acc,CurrVal) => acc += CurrVal.amount, 0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    transactionType.forEach((t) => {
        const category = categories.find( (c) => c.type === t.category);
        if(category) category.amount += t.amount;
    });

    const filterCategories = categories.filter( (c) => c.amount > 0);

    const chartData = {
        datasets : [{
            data : filterCategories.map((c) => c.amount),
            backgroundColor : filterCategories.map((c) => c.color ),
            fontColor : 'red',
           
        }],
       labels : filterCategories.map( (c) => c.type),
       width : 200,
       height : 100,
       options: {
           maintainAspectRatio : false,
       }
        }
        
    return {  total, chartData}
}
export default useTransaction;