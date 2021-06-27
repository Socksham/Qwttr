import React, { useState, Fragment } from 'react'
import { View, Text, TextInput, ScrollView, SafeAreaView, Image, StyleSheet } from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Slider, Button} from 'react-native-elements';
import { auth, db } from '../config/Firebase';
import {Picker} from '@react-native-picker/picker';

import colors from "../config/colors.js"

export default function SurveyScreen(props) {
    const [oneSlider, setOneSlider] = useState(5)
    const [twoSlider, setTwoSlider] = useState(5)
    const [threeSlider, setThreeSlider] = useState(5)
    const [fourSlider, setFourSlider] = useState(5)
    const [fiveSlider, setFiveSlider] = useState(5)
    const [selectedLanguage1, setSelectedLanguage1] = useState("Sports");
    const [selectedLanguage2, setSelectedLanguage2] = useState("Anime");
    const [selectedLanguage3, setSelectedLanguage3] = useState("Gaming");
    const [selectedLanguage4, setSelectedLanguage4] = useState("Anime");
    const [selectedLanguage5, setSelectedLanguage5] = useState("Sports");
    const [interest1, setInterest1] = useState("Sports");
    const [interest2, setInterest2] = useState("Anime");
    const [interest3, setInterest3] = useState("Gaming");
    const [interest4, setInterest4] = useState("Anime");
    const [interest5, setInterest5] = useState("Sports");
    const [screen2, setScreen2] = useState(false)
    const counselorNumList = []
    const counselorIDList = []
    var counselorSize = 0
    var once=true

    const evaluateAnswer = () => {
      setScreen2(!screen2)
    }

    const finalCounselor = () => {
      counselorSize = (counselorSize-1)
      if(counselorSize==0){
        alert(counselorIDList[counselorNumList.indexOf(Math.max(...counselorNumList))])
      }
    }


    const compareCounselor = (num1, num2, num3, num4, num5, int1, int2, int3, int4, int5) => {
      const counsNumArray = [num1, num2, num3, num4, num5];
      const counsIntArray = [int1, int2, int3, int4, int5];
      const intArray = [interest1, interest2, interest3, interest4, interest5]
      const numArray = [oneSlider, twoSlider, threeSlider, fourSlider, fiveSlider]
      var counselorRank = 0
      intArray.forEach(
        element => {
          if(counsIntArray.includes(element)){
            var similarInt = Math.abs((numArray[intArray.indexOf(element)] / counsNumArray[counsIntArray.indexOf(element)])-1)
            //alert(similarInt)
            if(similarInt <= 0.4){
              counselorRank = counselorRank + (numArray[intArray.indexOf(element)] * (similarInt+1))
            } else {
              counselorRank = counselorRank + 0.1
            }
          }
        }
      );
      return(counselorRank)
    }

    const finalizeAnswers = () => {

      var data = {"interest1":interest1,"interest2":interest2,"interest3":interest3,"interest4":interest4,"interest5":interest5,"number1":oneSlider,"number2":twoSlider,"number3":threeSlider,"number4":fourSlider, "number5":fiveSlider}
      // alert("Done!")
      // alert(interest1+";"+oneSlider)
      let user = auth.currentUser
      // var batch = db.batch();
      let docRef = db.collection("users").doc(user.uid);
      docRef.set({
        data
      }, {merge:true})
      // alert(docRef.user)
      // batch.set(docRef, {user: "sus_man3@gmail.com"});
      // batch.commit().then(() => {
      //   // ...
      // });
      // docRef.get().then((doc)=>{
      //   doc.data()
      // })



      // alert("docRef.data().user")
      db.collection("users").where("userType", "==", "advisor")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(once){
                counselorSize = (querySnapshot.size)
              }
              once=false
              //alert(counselorSize)
              // doc.data() is never undefined for query doc snapshots
              // alert(doc.id, " => ", doc.data());
              var dataSnap = doc.data().data
              var num1 = dataSnap["number1"]
              var num2 = dataSnap["number2"]
              var num3 = dataSnap["number3"]
              var num4 = dataSnap["number4"]
              var num5 = dataSnap["number5"]
              var int1 = dataSnap["interest1"]
              var int2 = dataSnap["interest2"]
              var int3 = dataSnap["interest3"]
              var int4 = dataSnap["interest4"]
              var int5 = dataSnap["interest5"]
              var conName = doc.data().user
              counselorNumList.push(compareCounselor(num1, num2, num3, num4, num5, int1, int2, int3, int4, int5))
              counselorIDList.push(conName)
              finalCounselor()
              // for (var i=0;i<counselorInterest.length,i++){
              //   alert(i)
              // }
              // alert(doc.get("data"))
          });
      })
      .catch((error) => {
          // alert("Error getting documents: ", error);
      });
      //alert(counselorNumList.indexOf(Math.max(...counselorNumList)))
      //alert(counselorIDList[0])

      props.navigation.navigate("Routes")
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
          <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.secondary }} />
            <SafeAreaView>
              <View style={{height: "8%", justifyContent: "center", alignItems: "center", backgroundColor: colors.secondary}}>
                  <Image style = {{resizeMode: "contain", height: "90%"}} source = {require('../assets/qwttr.jpg')}></Image>
              </View>
              <View style={surveyStyles.mainView}>
                <Text style={surveyStyles.directionText}>Please Enter Your Top 5 Interests Below</Text>
                <ScrollView style={surveyStyles.scrllView} contentContainerStyle={{justifyContent: "center"}}>
                  <TextInput
                    onChangeText={(text) => evaluateAnswers(text, "custom", 1)}
                    value={interest1}
                    style={surveyStyles.txtInput}
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
                    style={surveyStyles.txtInput}
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
                    style={surveyStyles.txtInput}
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
                    style={surveyStyles.txtInput}
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
                    style={surveyStyles.txtInput}
                  />
                  <Picker
                    selectedValue={selectedLanguage5}
                    onValueChange={(itemValue, itemIndex) => evaluateAnswers(itemValue, itemValue, 5)}>
                    <Picker.Item label="Custom" value="Enter Here" />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Anime" value="Anime" />
                    <Picker.Item label="Gaming" value="Gaming" />
                  </Picker>
                  <Button
                    title="Next Page"
                    raised={true}
                    onPress={evaluateAnswer}
                    style={surveyStyles.nextButton}
                  />
                </ScrollView>
              </View></SafeAreaView></Fragment>)
      } else {
        return(
          <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.secondary }} />
            <SafeAreaView>
              <View style={{height: "8%", justifyContent: "center", alignItems: "center", backgroundColor: colors.secondary}}>
                  <Image style = {{resizeMode: "contain", height: "90%"}} source = {require('../assets/qwttr.jpg')}></Image>
              </View>
              <ScrollView style={surveyStyles.secondScrllView} contentContainerStyle={{justifyContent: "center"}}>
                <Text style={surveyStyles.directionTextSmaller}>How many hours per week do you spend on {interest1}? {"\n\n"} Selected: {oneSlider} hours</Text>
                <Slider
                    value={oneSlider}
                    maximumValue={10}
                    minimumValue={0}
                    step={1}
                    onValueChange={(value) => setOneSlider(value)}
                    thumbTintColor={colors.secondary}
                    style={surveyStyles.sliderStyle}
                />
                <Text style={surveyStyles.directionTextSmaller}>How many hours per week do you spend on {interest2}? {"\n\n"} Selected: {twoSlider} hours</Text>
                <Slider
                    value={twoSlider}
                    maximumValue={10}
                    minimumValue={0}
                    step={1}
                    onValueChange={(value) => setTwoSlider(value)}
                    thumbTintColor={colors.secondary}
                    style={surveyStyles.sliderStyle}
                />
                <Text style={surveyStyles.directionTextSmaller}>How many hours per week do you spend on {interest3}? {"\n\n"} Selected: {threeSlider} hours</Text>
                <Slider
                    value={threeSlider}
                    maximumValue={10}
                    minimumValue={0}
                    step={1}
                    onValueChange={(value) => setThreeSlider(value)}
                    thumbTintColor={colors.secondary}
                    style={surveyStyles.sliderStyle}
                />
                <Text style={surveyStyles.directionTextSmaller}>How many hours per week do you spend on {interest4}? {"\n\n"} Selected: {fourSlider} hours</Text>
                <Slider
                    value={fourSlider}
                    maximumValue={10}
                    minimumValue={0}
                    step={1}
                    onValueChange={(value) => setFourSlider(value)}
                    thumbTintColor={colors.secondary}
                    style={surveyStyles.sliderStyle}
                />
                <Text style={surveyStyles.directionTextSmaller}>How many hours per week do you spend on {interest5}? {"\n\n"} Selected: {fiveSlider} hours</Text>
                <Slider
                    value={fiveSlider}
                    maximumValue={10}
                    minimumValue={0}
                    step={1}
                    onValueChange={(value) => setFiveSlider(value)}
                    thumbTintColor={colors.secondary}
                    style={surveyStyles.sliderStyle}
                />
                <Button
                  title="Back"
                  raised={true}
                  onPress={evaluateAnswer}
                  style={surveyStyles.endButtons}
                />
                <Button
                  title="Submit Answers"
                  raised={true}
                  onPress={finalizeAnswers}
                  style={surveyStyles.endButtons}
                />
              </ScrollView>
            </SafeAreaView>
          </Fragment>
        )
      }
    }

    

    return (
        interestsScreen()
    )
}

const surveyStyles = StyleSheet.create({
  mainView: {
    alignItems: "center"
  },
  directionText: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 25,
    marginBottom: 25
  },
  directionTextSmaller: {
    fontWeight: '600',
    fontSize: 16,
    margin: 25,
    textAlign: "center"
  },
  txtInput: {
    width: "100%",
    padding: 15,
    fontSize: 16,
    borderColor: colors.secondary,
    borderBottomWidth: 1,
    textAlign: "center"
  },
  scrllView: {
    width: "100%",
    height: "77%"
  },
  secondScrllView: {
    width: "100%",
    height: "85%"
  },
  nextButton: {
    marginLeft: 40,
    marginRight: 40
  },
  endButtons: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40
  },
  sliderStyle: {
    marginLeft: 15,
    marginRight: 15
  }
})
