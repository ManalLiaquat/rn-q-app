import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const { token } = JSON.parse(await AsyncStorage.getItem("user"));
    // console.log(token ? "\n\nTRUE" : "\n\nFALSE", "chal gaya");
    // this.props.navigation.navigate("App");
    this.props.navigation.navigate(token ? "App" : "Auth");
  };

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
