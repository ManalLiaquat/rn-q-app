import * as React from "react";
import { StyleSheet, AsyncStorage, Alert, View } from "react-native";
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
      res.logInAs = logInAs;
      res.token = token;
      await AsyncStorage.setItem("user", JSON.stringify(res));
      firebase
        .database()
        .ref(`/users/${res.id}/`)
        .set(res);
      firebase
        .database()
        .ref("/fcmTokens")
        .child(token)
        .set(res.id);
      this.props.navigation.navigate("Home", { logInAs });
    } else {
      console.log("type === cancel");
      // type === 'cancel'
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          full
          info
          onPress={() => {
            this.logIn("company");
            // this.props.navigation.navigate("Home", { logInAs: "company" });
          }}
        >
          <Text>Are you a company?</Text>
        </Button>
        <Button
          full
          danger
          onPress={() => {
            this.logIn("user");
            // this.props.navigation.navigate("Home", { logInAs: "user" });
          }}
        >
          <Text>Are you finding/waiting for tokens?</Text>
        </Button>
      </View>
    );
  }
}
