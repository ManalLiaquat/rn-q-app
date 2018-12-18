import * as React from "react";
import { StyleSheet, AsyncStorage, Alert } from "react-native";
import { Container, Header, Content, Button, Text } from "native-base";
import { Facebook } from "expo";
import firebase from "../../Config/Firebase";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      type: "cancel",
      token: null
    };
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      // this.logIn();
    }, 1500);
  }

  async logIn(logInAs) {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "1302749559866771",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      let res = await response.json();
      // Alert.alert(`Logged in! Hi ${res.name}!`);
      // console.log('Token', token);
      await AsyncStorage.setItem("userToken", token);
      console.log(res);
      res.logInAs = logInAs;
      console.log(res);
      firebase
        .database()
        .ref(`/users/${res.id}/`)
        .set(res)
        .then(() => {
          this.props.navigation.navigate("Home");
        });
      firebase
        .database()
        .ref("/fcmTokens")
        .child(token)
        .set(res.id);
    } else {
      console.log("type === cancel");
      // type === 'cancel'
    }
  }

  render() {
    return (
      <Content>
        <Button
          full
          info
          onPress={() => {
            this.logIn("company");
          }}
        >
          <Text>Are you a company?</Text>
        </Button>
        <Button
          full
          danger
          onPress={() => {
            this.logIn("user");
          }}
        >
          <Text>Are you finding/waiting for tokens?</Text>
        </Button>
      </Content>
    );
  }
}
