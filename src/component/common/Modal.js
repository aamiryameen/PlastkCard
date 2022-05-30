import React, { PureComponent } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Modal
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colorWhiteffffff, ligh_green, Moderateyellow, mulish_bold, mulish_regular } from '../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../utils/Utils'
import Text from '../common/Text'
import Button from '../common/Button'
import { ScrollView } from 'react-native-gesture-handler';

export default class CustomModal extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      errorModalVisible: true,

    };
  }

  render() {
    const { responseMessage, onPress, modalType } = this.props
    return (
      <View style={styles.container} >

        <Modal
          animationType="slide"
          transparent={true}

          visible={this.state.errorModalVisible}
          onRequestClose={() => {

          }}>
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignContent: 'center',
          }}>


            <View style={styles.centeredView}>
              {
                modalType == 'error' ?
                  <View style={styles.errorImageContainr}>
                    <Image source={require("../../assets/images/error.png")} style={{ height: normalizeY(17), width: "25%", resizeMode: "contain" }} />
                  </View>
                  : <View style={styles.successImageContainer}>
                    <AntDesign
                      name="check"
                      style={styles.icon}
                      color={colorWhiteffffff}
                      size={30}
                    />
                  </View>
              }

              <View style={styles.errorTextStyle}>
                {modalType == "error" ? <Text style={styles.errorText}>Error</Text> : <Text style={styles.successText}>Success</Text>}
                <ScrollView style={{ marginBottom: normalizeY(7) }}>
                  <Text style={styles.tryAgainText}>{responseMessage}</Text>
                </ScrollView>

              </View>

              <View style={{ flex: 0.3, alignItems: "flex-end", margin: 10 }}>
                <AntDesign
                  name="close"
                  style={styles.icon}
                  color={Moderateyellow}
                  size={25}
                  onPress={() => { this.setState(!this.state.errorModalVisible) }, onPress} />
              </View>
            </View>
          </View>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  centeredView: {
    flexDirection: "row",
    backgroundColor: colorWhiteffffff,
    flex: 0.25,
    margin: 30,
    borderRadius: 20,
    marginTop: normalizeY(30),
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  errorImageContainr: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.8,
    backgroundColor: "#E53935",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  successImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.7,
    backgroundColor: ligh_green,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  errorTextStyle: {
    flex: 2,
    marginLeft: normalizeX(5),
    marginTop: normalizeY(20),
  },
  errorText: {
    color: "#E53935",
    fontFamily: mulish_bold,
    fontSize: normalizeFont(20),
  },
  tryAgainText: {
    fontFamily: mulish_regular,
    marginTop: normalizeY(5),
    fontSize: normalizeFont(15)
  },
  successText: {
    color: ligh_green,
    fontFamily: mulish_bold,
    fontSize: normalizeFont(20)
  },
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 20,
    marginTop: normalizeY(20)
  }



});

