import React,{useState, useEffect, useContext} from 'react';
import { TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {v4 as uuidv4}  from 'uuid';
import { useSpeechContext } from '@speechly/react-client';

import useStyles from './styles';
import { ExpenseTrackerContext } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import FormatDate from '../../../utils/FormatDate';
import TransactionSnackBar from '../../SnackBar/SnackBar';

const initialState={
    amount:'',
    type:'Income',
    category:'',
    date:FormatDate(new Date()),
}
const Form = () => {
    const classes = useStyles();
    const [FormData, setFormData] = useState(initialState);
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const {segment} = useSpeechContext();
    const [open , setOpen] = useState(false);

    const createTransaction = ( ) => {
     if(Number.isNaN(Number(FormData.amount)) || !FormData.date.includes('-')) return;
     const transaction = {...FormData, amount: Number(FormData.amount), id: uuidv4()};
     setOpen(true);
     addTransaction(transaction);
     setFormData(initialState);
    }

    useEffect(() => {
        if(segment) {
            if(segment.intent.intent === 'add_expense'){
                setFormData( { ...FormData, type : 'Expense'});
            }
            else if(segment.intent.intent === 'add_income'){
                setFormData( { ...FormData, type : 'Income'});
            }
            else if( segment.isFinal && segment.intent.intent === 'add_transaction'){
                return createTransaction();
            }
            else if( segment.isFinal && segment.intent.intent === 'cancel_transaction'){
                return setFormData(initialState);
            }
        segment.entities.forEach((e) => {
            const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
            switch (e.type) {
                case 'amount':
                    setFormData ( {...FormData , amount : e.value});
                    break;
                case 'category' : 
                 if(incomeCategories.map((ic) => ic.type).includes(category)){
                    setFormData( {...FormData, type: 'Income' , category});
                 }
                 else if( expenseCategories.map((ic) => ic.type).includes(category)){
                    setFormData( {...FormData, type: 'Expense' , category});
                 }
                    break;
                case 'date':
                    setFormData({ ...FormData, date: e.value});
                    break;
                default:
                    break;
            }
        })
        if(segment.isFinal && FormData.amount && FormData.category && FormData.date && FormData.type){
            createTransaction();
        }
        }
    }, [segment])

    const selectedcategories = FormData.type === 'Income' ? incomeCategories : expenseCategories; 
    return (
        <Grid container spacing={2}>
        <TransactionSnackBar open = {open} setOpen = {setOpen}/>
            <Grid item xs={12}>
                <Typography variant="subtitle2" align="center" gutterBottom>
                   {segment ? (
                       <>
                         {segment.words.map((w) => w.value).join(" ")}
                       </>
                   ) : null}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={FormData.type} onChange={(e) => setFormData({...FormData, type: e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={FormData.category} onChange={(e) => setFormData({...FormData, category:e.target.value})}>
                        {selectedcategories.map((c)=> <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={FormData.amount} onChange={(e) => setFormData({...FormData, amount:e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="date" fullWidth value={FormData.date} onChange={(e) => setFormData({...FormData, date : FormatDate(e.target.value)})} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
