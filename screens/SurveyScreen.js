import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Slider, Button} from 'react-native-elements';



export default function SurveyScreen() {
    const [sportsSlider, setSportsSlider] = useState(5)
    const [animeSlider, setAnimeSlider] = useState(5)
    const [gamerSlider, setGamerSlider] = useState(5)
    const [techSlider, setTechSlider] = useState(5)
    const [fashionSlider, setFashionSlider] = useState(5)
    const [moneySlider, setMoneySlider] = useState(5)
    const [disable, setDisable] = useState(false)
    const [question, setQuestion] = useState("")
    const [questionOR, setQuestionOR] = useState("")
    const [question1, setQuestion1] = useState("")
    const [question2, setQuestion2] = useState("")
    const [questionNum, setQuestionNum] = useState(0)


    const evaluateAnswer = () => {
      setDisable(true)
      setQuestion("Would you rather")
      setQuestionOR("OR")
      newQuestion()
    }


    const newQuestion = () => {
      if(sportsSlider >= 6 && questionNum<1){
        setQuestion1("Watch a game of Football")
        setQuestion2("Play a game of Tennis")
        setQuestionNum(1)
      }
      else if(animeSlider >= 6 && questionNum<2){
        setQuestion1("Skip through episodes to get to the main plot")
        setQuestion2("Read the Manga")
        setQuestionNum(2)
      }
      else if(gamerSlider >= 6 && questionNum<3){
        setQuestion1("Play Minecraft")
        setQuestion2("Play Call of Duty")
        setQuestionNum(3)
      }
      else if(techSlider >= 6 && questionNum<4){
        setQuestion1("Have less powerful devices that last a long time")
        setQuestion2("Have super powerful devices with limited software support")
        setQuestionNum(4)
      }
      else if(fashionSlider >= 6 && questionNum<5){
        setQuestion1("Have the best looking clothes")
        setQuestion2("Have the most expensive looking clothes")
        setQuestionNum(5)
      }
      else if(moneySlider >= 6 && questionNum<6){
        setQuestion1("Invest for a rich future")
        setQuestion2("Spend as you go, living in the moment")
        setQuestionNum(6)
      }
      else{
        setQuestion1("Quickly lose your addiction")
        setQuestion2("Help others lose their addictions")
        setQuestionNum(7)
      }
    }

    const evaluateAnswers = (name) => {
      alert(name)
      if(questionNum == 0){
        return
      }
      newQuestion()
      if(questionNum == 7){
        alert("Done")
      }
    }

    

    return (
        <View>
            <Text>
            {"\n"}
            {"\n"}
            {"\n"}
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
            <Text>
            Hi~{"\n"}
            this is a test message.{"\n"}
            i
            </Text>
            <Text>How much do you personally like sports? {"\n"} (1=Hate, 10=Love){"\n"}</Text>
            <Slider
                value={sportsSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setSportsSlider(value)}
                disabled = {disable}
            />
            <Text>Value: {sportsSlider}</Text>
            <Text>How much do you personally like anime? {"\n"} (1=Hate, 10=Love){"\n"}</Text>
            <Slider
                value={animeSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setAnimeSlider(value)}
                disabled = {disable}
            />
            <Text>Value: {animeSlider}</Text>
            <Text>How much do you personally like video games? {"\n"} (1=Hate, 10=Love){"\n"}</Text>
            <Slider
                value={gamerSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setGamerSlider(value)}
                disabled = {disable}
            />
            <Text>Value: {gamerSlider}</Text>
            <Text>How much do you personally like technology? {"\n"} (1=Hate, 10=Love){"\n"}</Text>
            <Slider
                value={techSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setTechSlider(value)}
                disabled = {disable}
            />
            <Text>Value: {techSlider}</Text>
            <Text>How much do you personally like fashion? {"\n"} (1=Hate, 10=Love){"\n"}</Text>
            <Slider
                value={fashionSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setFashionSlider(value)}
                disabled = {disable}
            />
            <Text>Value: {fashionSlider}</Text>
            <Text>How much do you personally like finance? {"\n"} (1=Hate, 10=Love){"\n"}</Text>
            <Slider
                value={moneySlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setMoneySlider(value)}
                disabled = {disable}
            />
            <Text>Value: {moneySlider}</Text>
            <Button
              title="Submit Answers"
              raised={true}
              onPress={evaluateAnswer}
              disabled={disable}
            />
            {/* <Slider
              value={animeSlider}
              onValueChange={(value) => setAnimeSlider(value)}
              maximumValue={10}
              minimumValue={0}
              step={1}
              // allowTouchTrack={"Yes"}
              // animateTransitions={"Yes"}
              // trackStyle={{ height: 10, backgroundColor: 'transparent' }}
              // thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
            /> */}

            <View>
              <Text>{question}</Text>
              <Button title={question1} onPress={() => evaluateAnswers("One")}></Button>
              <Text>{questionOR}</Text>
              <Button title={question2} onPress={() => evaluateAnswers("Two")}></Button>
            </View>
           

        </View>
    )
}
