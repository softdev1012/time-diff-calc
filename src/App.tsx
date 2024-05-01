import React, { useEffect, useState } from 'react';
import spacetime from 'spacetime';
import TimezoneSelect, { allTimezones } from 'react-timezone-select';
import type { ITimezone } from 'react-timezone-select';
import './App.css'
import { Grid, Typography } from '@mui/material';

export type ISelectStyle = 'react-select' | 'select';

const timezones = {
  ...allTimezones,
  'America/Lima': 'Pittsburgh',
  'Europe/Berlin': 'Frankfurt',
};

const App = () => {
  const [selectedTimezone1, setSelectedTimezone1] = React.useState<ITimezone>(spacetime.now().timezone().name);
  const [selectedTimezone2, setSelectedTimezone2] = React.useState<ITimezone>(spacetime.now().timezone().name);

  const [datetime1, setDatetime1] = useState(spacetime.now());
  const [datetime2, setDatetime2] = useState(spacetime.now());
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const tzValue1 = typeof selectedTimezone1 === 'string' ? selectedTimezone1 : selectedTimezone1.value;
    setDatetime1(datetime1.goto(tzValue1));

    const tzValue2 = typeof selectedTimezone2 === 'string' ? selectedTimezone2 : selectedTimezone2.value;
    setDatetime2(datetime2.goto(tzValue2));

    setDiff(spacetime.now().goto(tzValue1).offset() - spacetime.now().goto(tzValue2).offset());

    const interval = setInterval(() => {
      setDatetime1(spacetime.now().goto(tzValue1));
      setDatetime2(spacetime.now().goto(tzValue2));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimezone1, selectedTimezone2]);
  const selectOptions = {
    timezones,
  };

  return (
    <React.Fragment>
      <Grid container spacing={0} sx={{marginTop:1, maxWidth:'1280px', marginX: 'auto'}}>
        <Grid item xs={12} sx={{marginY:3}}> <Typography variant='h2' sx={{textAlign:'center', color:'GrayText'}}>Time difference calculator</Typography> </Grid>
        <Grid item xs={4}>
          <Grid container spacing={5} sx={{marginTop:5}}>
            <Grid item xs={12}>
              <TimezoneSelect
                value={selectedTimezone1}
                onChange={setSelectedTimezone1}
                {...selectOptions}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{textAlign:'center'}}>Current Date / Time in{' '} <b style={{color: "blue"}}>{typeof selectedTimezone1 === 'string' ? selectedTimezone1.split('/')[1] : selectedTimezone1.value.split('/')[1]}</b></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' sx={{textAlign:'center'}}>{datetime1.unixFmt('YYYY-MM-dd HH:mm:ss')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{marginTop:20}}>
          <Typography variant='h4' sx={{textAlign: 'center'}}>
            <b style={{color: "blue"}}>{typeof selectedTimezone1 === 'string' ? selectedTimezone1.split('/')[1] : selectedTimezone1.value.split('/')[1]}</b> {' '}
            is {diff > 0 ? "ealier " : "later "}
          </Typography>
          <Typography variant='h4' sx={{textAlign: 'center', color:'red'}}>
            {Math.floor(Math.abs(diff) / 60)} hours {" "} {Math.abs(diff) % 60 > 0 ? Math.abs(diff) % 60 + " minutes" : ""}
          </Typography>

          <Typography variant='h4' sx={{textAlign: 'center'}}>
            than <b style={{color: "blue"}}>{typeof selectedTimezone2 === 'string' ? selectedTimezone2.split('/')[1] : selectedTimezone2.value.split('/')[1]}</b>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={5} sx={{marginTop:5}}>
            <Grid item xs={12}>
              <TimezoneSelect
                value={selectedTimezone2}
                onChange={setSelectedTimezone2}
                {...selectOptions}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5' sx={{textAlign:'center'}}>Current Date / Time in{' '} <b style={{color: "blue"}}>{typeof selectedTimezone2 === 'string' ? selectedTimezone2.split('/')[1] : selectedTimezone2.value.split('/')[1]}</b></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' sx={{textAlign:'center'}}>{datetime2.unixFmt('YYYY-MM-dd HH:mm:ss')}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  
  );
};

export default App;
