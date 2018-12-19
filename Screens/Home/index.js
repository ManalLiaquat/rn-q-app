import * as React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Constants, Facebook } from "expo";
import { Button, Icon, Text } from "native-base";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.load_user();
  }

  static navigationOptions = {
    title: "Home",
    headerRight: (
      <Button
        light
        iconRight
        transparent
        onPress={async () => {
          await AsyncStorage.removeItem("user");
          this.props.navigation.navigate("Auth");
        }}
      >
        <Icon name="md-log-out" />
      </Button>
    )
  };

  load_user = async () => {
    this.setState({ user: JSON.parse(await AsyncStorage.getItem("user")) });
  };

  render() {
    const { user } = this.state;
    return (
      <View>
        <Text>You're looged in successfully</Text>
        <Text>{user && user.logInAs}</Text>
        {/* <Button
          onPress={async () => {
            await AsyncStorage.removeItem("user");
            this.props.navigation.navigate("Auth");
          }}
        >
          <Text>Logout</Text>
        </Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
