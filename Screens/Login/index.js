import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  Alert
} from "react-native";
import { Facebook } from "expo";
import firebase from "../../Config/Firebase";

export default class Login extends React.Component {
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
      this.logIn();
    }, 1500);
  }

  async logIn() {
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
      // console.log(res);
      // console.log('Token', token);
      await AsyncStorage.setItem("userToken", token);
      this.props.navigation.navigate("Home");
      firebase
        .database()
        .ref(`/users/`)
        .set(res);
      firebase
        .database()
        .ref("/fcmTokens")
        .child(token)
        .set(res.uid);
    } else {
      console.log("type === cancel");
      // type === 'cancel'
    }
  }

  render() {
    return <Button onPress={this.logIn} title="Login With Facebook" />;
  }
}
