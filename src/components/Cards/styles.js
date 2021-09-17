import { makeStyles } from "@material-ui/core";

export default makeStyles(() =>({
    income : {
        background: 'rgba(21,20,35,0.7)',
        borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
        boxShadow: "inset 0 0 3px 0 #202124, -5px -5px 12px 0 #232239, 6px 6px 12px 0 #121120",
        color:'white',
        '&:hover':{
            background: 'rgba(21,20,35,255)',
        },
        
    },
 
    expense :{
        borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
        boxShadow: "inset 0 0 3px 0 #202124, -5px -5px 12px 0 #232239, 6px 6px 12px 0 #121120",
        color:'white',
        background: 'rgba(21,20,35,0.7)',
        '&:hover':{
            background: 'rgba(21,20,35,255)',
        }
    },

}));

