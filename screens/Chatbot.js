

import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';

import { dialogflowConfig } from '../env';
import { SafeAreaView } from 'react-navigation';

import colors from "../config/colors.js"

const BOT_USER = {
  _id: 2,
  name: 'Motivation Bot',
  avatar:''
};

class App extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the Motivation bot from Qwttr.\n\nHow may I help you today?`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  async handleGoogleResponse(result) {
    console.log(result)
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    await this.sendBotResponse(text);
  }

  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    await Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.secondary }} />
        <SafeAreaView>
          <View style={{height: "8%", justifyContent: "center", alignItems: "center", backgroundColor: colors.secondary}}>
            <Image style = {{resizeMode: "contain", height: "90%"}} source = {require('../assets/qwttr.jpg')}></Image>
          </View>
          <View style={{ height: "90%", backgroundColor: '#fff' }}>
            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: 1
              }}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default App;

// Possible Unhandled Promise Rejection (id:12): TypeError: undefined is not an object (evaluating 'result.queryResult.fulfillmentMessages')
//handleResponse$ tryCatch@http://127.0.0.1:19000/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&hot=false