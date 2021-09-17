import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';



export default makeStyles((theme) => ({
  avatarIncome: {
    color: '#fff',
    backgroundColor: green[500],
  },
  avatarExpense: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  list: {
    maxHeight: '120px',
    overflow: 'auto',
    '&::-webkit-scrollbar':{
       width: '10px',
       height: '8px',
     
    },
    '&::-webkit-scrollbar-corner':{
        backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb':{
        backgroundColor: 'white',
        borderRadius: '3px',
    }
  },
}));