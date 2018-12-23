import React from "react";
import { Modal, TouchableHighlight, TouchableOpacity } from "react-native";
import {
  Container,
  Button,
  Text,
  View,
  Icon,
  Fab,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      active: true,
      isProfileModal: false
    };
  }

  static getDerivedStateFromProps(props) {
    console.log("IsUser_REDUX ==>", props.user ? "YES" : "NO");
    console.log(props.user);

    return { user: props.user };
  }

  showProfileModal = () => {
    const { isProfileModal } = this.state;
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
            </View>
            <Form>
              <Item floatingLabel>
                <Label>Name of Company</Label>
                <Input />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
            </Form>
          </View>
        </Modal>
      </View>
    );
  };

  componentDidMount() {
    this.props.updateUser();
  }

  render() {
    // const {} = this.state;
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
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
