import React from 'react'
import { View, Text } from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));


  const marks = [
    {
      value: 0,
      label: 'Heavily Dislike',
    },
    {
      value: 50,
      label: 'Moderate',
    },
    {
      value: 100,
      label: 'I love it!',
    },
  ];
  
  function valuetext(value) {
    return `${value}°C`;
  }


export default function SurveyScreen() {
    const classes = useStyles();
    return (
        <View>
            <Text>
            Sports 
            Anime
            Video Games
            Cars

            Survey
            Survey
            Survey
            Survey
            </Text>
            <Text>How much do you personally like...</Text>
            <br></br>
            <div className={classes.root}>
                <Typography id="discrete-slider-custom" gutterBottom>
                    Sports
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="on"
                    marks={marks}
                />
            </div>
            <br></br>
            <div className={classes.root}>
                <Typography id="discrete-slider-custom" gutterBottom>
                    Anime
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="on"
                    marks={marks}
                />
            </div>
            <br></br>
            <div className={classes.root}>
                <Typography id="discrete-slider-custom" gutterBottom>
                    Video games
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="on"
                    marks={marks}
                />
            </div>
            <br></br>
            <div className={classes.root}>
                <Typography id="discrete-slider-custom" gutterBottom>
                    Technology
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="on"
                    marks={marks}
                />
            </div>
            <br></br>
            <div className={classes.root}>
                <Typography id="discrete-slider-custom" gutterBottom>
                    Cars
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="on"
                    marks={marks}
                />
            </div>
            <br></br>
            <div className={classes.root}>
                <Typography id="discrete-slider-custom" gutterBottom>
                    Sports
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="on"
                    marks={marks}
                />
            </div>

            <Button variant="contained">Default</Button>
            <Button variant="contained">Default</Button>
            <Button variant="contained" onClick={() => { alert('clicked') }}>Click me</Button>


        </View>
    )
}
