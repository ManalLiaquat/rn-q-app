import * as React from "react";
import { StyleSheet } from "react-native";
import Company from "../Company";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  static navigationOptions = {
    title: "Home"
    // headerRight: (

    // )
  };

  render() {
    const { user } = this.state;
    // please put here if else condition for company and normal user
    return <Company />;
  }
}

const styles = StyleSheet.create({});
