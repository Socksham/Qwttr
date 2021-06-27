import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Slider, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';


export default function SurveyScreen() {
    const [oneSlider, setOneSlider] = useState(5)
    const [twoSlider, setTwoSlider] = useState(5)
    const [threeSlider, setThreeSlider] = useState(5)
    const [fourSlider, setFourSlider] = useState(5)
    const [fiveSlider, setFiveSlider] = useState(5)
    const [moneySlider, setMoneySlider] = useState(5)
    const [question, setQuestion] = useState("")
    const [questionOR, setQuestionOR] = useState("")
    const [question1, setQuestion1] = useState("")
    const [question2, setQuestion2] = useState("")
    const [questionNum, setQuestionNum] = useState(0)
    const [selectedLanguage1, setSelectedLanguage1] = useState("Sports");
    const [selectedLanguage2, setSelectedLanguage2] = useState("Sports");
    const [selectedLanguage3, setSelectedLanguage3] = useState("Sports");
    const [selectedLanguage4, setSelectedLanguage4] = useState("Sports");
    const [selectedLanguage5, setSelectedLanguage5] = useState("Sports");
    const [interest1, setInterest1] = useState("Select an interest or enter a custom one");
    const [interest2, setInterest2] = useState("Select an interest or enter a custom one");
    const [interest3, setInterest3] = useState("Select an interest or enter a custom one");
    const [interest4, setInterest4] = useState("Select an interest or enter a custom one");
    const [interest5, setInterest5] = useState("Select an interest or enter a custom one");
    const [screen2, setScreen2] = useState(false)


    const evaluateAnswer = () => {
      setScreen2(!screen2)
    }

    const finalizeAnswers = () => {
      alert("Done!")
    }

    const evaluateAnswers = (text, name, number) => {
      
      if(number==1){
        setInterest1(text)
        setSelectedLanguage1(name)
      }
      else if(number==2){
        setInterest2(text)
        setSelectedLanguage2(name)
      }
      else if(number==3){
        setInterest3(text)
        setSelectedLanguage3(name)
      }
      else if(number==4){
        setInterest4(text)
        setSelectedLanguage4(name)
      }
      else {
        setInterest5(text)
        setSelectedLanguage5(name)
      }
    }

    const interestsScreen = () => {
      if(!screen2){
        return(
          <View>
            <Text>
            {"\n"}
            {"\n"}
            {"\n"}
            </Text>
            <Text>Please Enter Your Top 5 Interests Below</Text>
            <Text>
            {"\n"}
            {"\n"}
            </Text>
            <ScrollView>
            <TextInput
              onChangeText={(text) => evaluateAnswers(text, "custom", 1)}
              value={interest1}
            />
            <Picker
              selectedValue={selectedLanguage1}
              onValueChange={(itemValue, itemIndex) => evaluateAnswers(itemValue, itemValue, 1)}>
              <Picker.Item label="Custom" value="Enter Here" />
              <Picker.Item label="Sports" value="Sports" />
              <Picker.Item label="Anime" value="Anime" />
              <Picker.Item label="Gaming" value="Gaming" />
            </Picker>

            <TextInput
              onChangeText={(text) => evaluateAnswers(text, "custom", 2)}
              value={interest2}
            />
            <Picker
              selectedValue={selectedLanguage2}
              onValueChange={(itemValue, itemIndex) => evaluateAnswers(itemValue, itemValue, 2)}>
              <Picker.Item label="Custom" value="Enter Here" />
              <Picker.Item label="Sports" value="Sports" />
              <Picker.Item label="Anime" value="Anime" />
              <Picker.Item label="Gaming" value="Gaming" />
            </Picker>
            <TextInput
              onChangeText={(text) => evaluateAnswers(text, "custom", 3)}
              value={interest3}
            />
            <Picker
              selectedValue={selectedLanguage3}
              onValueChange={(itemValue, itemIndex) => evaluateAnswers(itemValue, itemValue, 3)}>
              <Picker.Item label="Custom" value="Enter Here" />
              <Picker.Item label="Sports" value="Sports" />
              <Picker.Item label="Anime" value="Anime" />
              <Picker.Item label="Gaming" value="Gaming" />
            </Picker>
            <TextInput
              onChangeText={(text) => evaluateAnswers(text, "custom", 4)}
              value={interest4}
            />
            <Picker
              selectedValue={selectedLanguage4}
              onValueChange={(itemValue, itemIndex) => evaluateAnswers(itemValue, itemValue, 4)}>
              <Picker.Item label="Custom" value="Enter Here" />
              <Picker.Item label="Sports" value="Sports" />
              <Picker.Item label="Anime" value="Anime" />
              <Picker.Item label="Gaming" value="Gaming" />
            </Picker>

            <TextInput
              onChangeText={(text) => evaluateAnswers(text, "custom", 5)}
              value={interest5}
            />
            <Picker
              selectedValue={selectedLanguage5}
              onValueChange={(itemValue, itemIndex) => evaluateAnswers(itemValue, itemValue, 5)}>
              <Picker.Item label="Custom" value="Enter Here" />
              <Picker.Item label="Sports" value="Sports" />
              <Picker.Item label="Anime" value="Anime" />
              <Picker.Item label="Gaming" value="Gaming" />
            </Picker>
            <Text>
            <Button
              title="Next Page"
              raised={true}
              onPress={evaluateAnswer}
            />
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            
            </Text>
            </ScrollView>
          </View>)
      } else {
        return(
          <View>
            <Text>
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            </Text>
            <Text>How many hours per week do you spend on {interest1}? {"\n"} Selected: {oneSlider} hours{"\n"}</Text>
            <Slider
                value={oneSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setOneSlider(value)}
            />
            <Text>{"\n"}</Text>
            <Text>How many hours per week do you spend on {interest2}? {"\n"} Selected: {twoSlider} hours{"\n"}</Text>
            <Slider
                value={twoSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setTwoSlider(value)}
            />
            <Text>{"\n"}</Text>
            <Text>How many hours per week do you spend on {interest3}? {"\n"} Selected: {threeSlider} hours{"\n"}</Text>
            <Slider
                value={threeSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setThreeSlider(value)}
            />
            <Text>{"\n"}</Text>
            <Text>How many hours per week do you spend on {interest4}? {"\n"} Selected: {fourSlider} hours{"\n"}</Text>
            <Slider
                value={fourSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setFourSlider(value)}
            />
            <Text>{"\n"}</Text>
            <Text>How many hours per week do you spend on {interest5}? {"\n"} Selected: {fiveSlider} hours{"\n"}</Text>
            <Slider
                value={fiveSlider}
                maximumValue={10}
                minimumValue={0}
                step={1}
                onValueChange={(value) => setFiveSlider(value)}
            />
            <Text>
              <Button
                title="Back"
                raised={true}
                onPress={evaluateAnswer}
              />
              
              {"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
              <Button
                title="Submit Answers"
                raised={true}
                onPress={finalizeAnswers}
              />
          </View>
        )
      }
    }

    

    return (
        interestsScreen()
    )
}
