import * as React from "react";
import { Alert, View } from "react-native";
import { Button, Text } from "native-base";
import { Facebook } from "expo";
import firebase from "../../Config/Firebase";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.logIn = this.logIn.bind(this);
  }

  async logIn(logInAs) {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "1302749559866771",
      {
        permissions: ["public_profile", "email"]
      }
    );

    if (type === "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(userCredential => {
          // console.log(userCredential.user, "*****userCredential*****");
          firebase
            .database()
            .ref(`/users/${userCredential.user.uid}/`)
            .set(userCredential.user)
            .then(() => {
              this.props.navigation.navigate("Home", { logInAs });
            });
        })
        .catch(error => {
          console.log(error);
        });
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
