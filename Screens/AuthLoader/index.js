import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import firebase from "../../Config/Firebase";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.checkUser();
  }

  _bootstrapAsync = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    // console.log(token ? "\n\nTRUE" : "\n\nFALSE", "chal gaya");
    // this.props.navigation.navigate("Auth");
    console.log(user ? "TRUE" : "FALSE");
    this.props.navigation.navigate(user ? "App" : "Auth");
  };

  checkUser() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        console.log("*****USER*****", user);
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        await AsyncStorage.setItem("user", null);
        console.log("*****NOT SIGNED IN*****");
      }
    });
  }

  // Render any loading content that you like here.
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" color="#00ff00" />
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      </View>
    );
  }
}
