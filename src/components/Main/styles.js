import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root:{
        background: 'rgba(182,212,255,0.7)',
        boxShadow: "inset 0 0 3px 0 #202124, -5px -5px 12px 0 #232239, 6px 6px 12px 0 #121120",
        color:'white',
        '& .MuiCardHeader-title':{
          color: "rgba(21,20,35,255)",
          fontWeight: "bold",
        },
        '& .MuiCardHeader-subheader':{
         fontStyle : "italic",
        }
    },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardContent: {
    paddingTop: 0,
  },
  divider: {
    margin: '10px 0',
  },
}));