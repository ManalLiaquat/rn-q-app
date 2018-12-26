import React from "react";
import { Modal, TextInput, StyleSheet, Alert } from "react-native";
import { Container, Button, Text, View, Icon, Fab, Label } from "native-base";
import { ImagePicker } from "expo";
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      profile: {
        name: "",
        since: "",
        certificates: [],
        timings: [],
        address: ""
      },
      // flags
      isFabActive: true,
      isProfileModal: true
    };
  }

  static getDerivedStateFromProps(props) {
    console.log("IsUser_REDUX ==>", props.user ? "YES" : "NO");
    // console.log(props.user);
    return { user: props.user };
  }

  showProfileModal = () => {
    let { isProfileModal, profile } = this.state;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isProfileModal}
          onRequestClose={() => {
            // alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Button
                rounded
                bordered
                small
                iconRight
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                  this.setState({ isProfileModal: false });
                }}
              >
                <Text>Close</Text>
                <Icon name="ios-close-circle-outline" />
              </Button>
              <View>
                <Text> </Text>
                <Label>Name of Company / Business</Label>
                <TextInput
                  placeholder="e.g. SuperMart"
                  style={styles.textBar}
                  onChangeText={text => {
                    profile.name = text;
                    this.setState({ profile });
                  }}
                  value={profile.name}
                />
                <Label>Since</Label>
                <TextInput
                  placeholder="e.g. 1980"
                  keyboardType="numeric"
                  style={styles.textBar}
                  onChangeText={text => {
                    if (text.length < 5) {
                      profile.since = text;
                      this.setState({ profile });
                    }
                  }}
                  value={profile.since}
                />
                <Text>Upload 3 images of certificates of company</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignSelf: "center"
                  }}
                >
                  <Button
                    border
                    small
                    success
                    onPress={() => {
                      this.uploadImage(1);
                    }}
                  >
                    <Text>Image 1</Text>
                  </Button>
                  <Button
                    border
                    small
                    success
                    onPress={() => {
                      this.uploadImage(2);
                    }}
                  >
                    <Text>Image 2</Text>
                  </Button>
                  <Button
                    border
                    small
                    success
                    onPress={() => {
                      this.uploadImage(3);
                    }}
                  >
                    <Text>Image 3</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  uploadImage = async index => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.handleUpload(
        result.uri,
        index,
        `image_${Math.floor(Math.random() * 999)}`
      )
        .then(() => Alert.alert("Success"))
        .catch(err => Alert.alert(JSON.stringify(err)));
    }
  };

  handleUpload = async (uri, index, imageName) => {
    let { profile } = this.state;
    const response = await fetch(uri);
    const blob = await response.blob();
    // console.log(uri);

    let ref = firebase
      .storage()
      .ref()
      .child(`images/${imageName}`);

    ref.getDownloadURL().then(url => {
      profile.certificates[index] = url;
      this.setState({ profile });
    });

    return ref.put(blob);
  };

  componentDidMount() {
    this.props.updateUser();
  }

  render() {
    const { isFabActive } = this.state;
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Fab
            active={isFabActive}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ isFabActive: !isFabActive })}
          >
            <Icon name="md-add" />
            <Button style={{ backgroundColor: "#34A34F" }} onPress={() => {}}>
              <Icon name="ios-add" />
            </Button>
            <Button
              style={{ backgroundColor: "#DD5144" }}
              onPress={() => {
                this.setState({ isProfileModal: true });
              }}
            >
              <Icon name="ios-person" />
            </Button>
          </Fab>
        </View>
        {this.showProfileModal()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

const styles = StyleSheet.create({
  textBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 10
  }
});
