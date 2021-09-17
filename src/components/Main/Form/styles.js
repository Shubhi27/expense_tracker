import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '-10px',
  },
  button: {
    marginTop: '10px',
    border: '1px solid rgba(21,20,35,255)',
    color: 'rgba(21,20,35,255)',
    '&:hover':{
     backgroundColor: 'rgba(21,20,35,255)',
     color: 'white',
    }
    },
}));