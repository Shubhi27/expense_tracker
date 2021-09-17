import React, {useEffect, useRef} from 'react';
import { Grid } from '@material-ui/core';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';

import Main from './components/Main/Main';
import Cards from './components/Cards/Cards';
import useStyles from './style';

const App = () => {
    const classes = useStyles();
    const {speechState} = useSpeechContext();
    const main = useRef(null);

    const executeScroll = () => main.current.scrollIntoView();
    useEffect(() => {
       if(speechState === SpeechState.Recording){
           executeScroll();
       }
    }, [speechState])
    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: "100vh" }}>
                <Grid item xs={12} sm={3} className={classes.mobile}>
                    <Cards title="Income"/>
                </Grid>
                <Grid ref={main} item xs={12} sm={4} className={classes.main}>
                   <Main/>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.desktop}>
                    <Cards title="Income"/>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.last}>
                    <Cards title="Expense"/>
                </Grid>
            </Grid>
            <PushToTalkButtonContainer size='4rem'>
                <PushToTalkButton style = {{ size : "4rem"}}/>
                <ErrorPanel/>
            </PushToTalkButtonContainer>
        </div>
    )
}

export default App;
