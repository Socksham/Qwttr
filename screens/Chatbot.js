import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';

import { dialogflowConfig } from '../env';

const BOT_USER = {
    _id: 2,
    name: 'Yoyo Bot',
    avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=YB'
};

class Chatbot extends Component {
    state = {
        messages: [
            {
                _id: 1,
                text: `Hi! I am the Yoyo Bot 🤖 from planet loop.\n\nHow may I help you with today?`,
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

    async handleResponse(result) {
        console.log(result);
        let text = await result.queryResult.fulfillmentMessages[0].text.text[0];
        let payload = result.queryResult.webhookPayload;
        this.showResponse(text, payload);
    }

  showResponse(text, payload) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    if (payload && payload.is_url) {
      msg.text = "image";
      msg.image = text;
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

    async onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        await Dialogflow_V2.requestQuery(
            message,
            result => this.handleResponse(result),
            error => console.log(error)
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1
                    }}
                />
            </View>
        );
    }
}

//

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chatbot;

// Possible Unhandled Promise Rejection (id:12): TypeError: undefined is not an object (evaluating 'result.queryResult.fulfillmentMessages')
//handleResponse$ tryCatch@http://127.0.0.1:19000/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&hot=false