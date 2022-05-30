

import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    Dimensions,
    BackHandler,
    Alert,
    StyleSheet,
    TextInput,
    Modal,
    StatusBar
} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const { width } = Dimensions.get("window");
import signUpScreenStyles from "../SignUp/SignUpStyle";
import headerComponentStyles from '../../component/styles/headerComponentStyles'
import theme from '../../utils/theme'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../component/common/Button'
import { normalizeX, normalizeY } from "../../utils/Utils";
import CodePin from 'react-native-pin-code';
const { height } = Dimensions.get('window');
import SvgUri from 'react-native-svg-uri';
import { mulish_bold, mulish_regular } from "../../utils/Constants";
export default class FingerPinSignUp extends React.Component {
    constructor(props) {
        super(props)

    }
    // const [selectedValue, setSelectedValue] = useState(null);
    state = {
        username: '',
        check_textInputChange: false,
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000,
        modalVisible: false,
        selectedValue : null
    };
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
  textInputChange = (val) => {
        if (val.length !== 0) {
            this.setState({
           
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
           
                username: val,
                check_textInputChange: false
            });
        }
    }
    onSuccess = () => {
        Alert.alert("Sucess!", "Pin code successfully set?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Ok", onPress: () => console.log("set") }
        ]);

    };
    onConfirmed = () => {

        Alert.alert("Confirmed!", "Pin code successfully set?", [

            { text: "Ok", onPress: () => console.log("set") }
        ]);

    };
    onError = () => {
        Alert.alert("Pin Code!", "Pin code successfully set?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => console.log("set") }
        ]);
    };
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    backAction = (props) => {
        Alert.alert("Hold on!", "Are you sure you want to go Main Screen?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.props.navigation.navigate("Demo") }
        ]);
        return true;
    };
    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo,
            selectedValue
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };
    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY,
            modalVisible
        } = this.state;
        return (
            <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} 
                style={{ flex: 1, backgroundColor: "#fff" }}>
                   
                   < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />  

                    <Modal
style={{marginTop:normalizeY(20)}}
 
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}>
      <View style={{flex:.3,borderRadius:10, marginTop:normalizeY(20), ...styles.modalView}}>
          <View style={{flex:0.3,alignItems:"flex-end",padding:20}} >
          <Ionicons  onPress={() => {
            this.setModalVisible(!modalVisible);
          }}
        style={{ marginTop: normalizeY(10), fontFamily: mulish_bold }}
        name="close"
        color={theme.LABEL_COLOR}
        size={20}
        fontFamily={mulish_bold}
    />
          </View>
          <View style={{paddingRight:normalizeX(20),alignItems:"flex-start",paddingLeft:normalizeX(10)}}>
          <Text style={{...styles.modalText,fontFamily:mulish_bold,fontSize:18,color:theme.LABEL_COLOR}}>Fund Your Card</Text>
        <Text style={{...styles.modalText,fontFamily:mulish_regular,fontSize:15, color: theme.LABEL_COLOR}}>{`¹why do i need to fill up this scren?`}</Text>
        <View style={{marginTop:normalizeY(20)}}>
        <Text style={{...styles.modalText,fontFamily:mulish_regular,fontSize:15, color: theme.LABEL_COLOR}}>{`dcsckln/dslcndls jbcdksjf bcDS ldb mdbd d ,man bsbadsçndsc nb sacmsjkdb˚¬s∂`}</Text>
        </View>
          </View>
      </View>
  </Modal>
                <View
                    style={{
                        width: "88%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 20,
                        borderTopRightRadius: 20,
                        borderColor: "#404968",
                        flex: 1
                    }} >
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: normalizeY(40),
                            marginBottom: normalizeY(20),
                            height: 60,
                            position: "relative",
                            borderRadius: 10,
                            backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR,
                        }}
                    >
                        <Animated.View
                            style={{
                                flex: 1,
                                position: "absolute",
                                width: "45%",
                                height: "80%",
                                top: 5,
                                left: 5,
                                right: 15,
                                bottom: 5,
                                backgroundColor: "#FECF31",
                                borderRadius: 10,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: theme.SEGMENTED_BORDER_COLOR,
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }>
                            <View style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        color: active === 0 ? "#fff" : theme.LABEL_COLOR}}>
                                Request Money
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: theme.SEGMENTED_BORDER_COLOR,
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderStyle: "solid",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <View style={{ flexDirection: "row" }}>
                              
                                <Text
                                    style={{
                                        color: active === 1 ? "#fff" : theme.LABEL_COLOR
                                    }}
                                >
                                    History
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Animated.View
                            style={{

                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }>
                            {/* Request Money */}
                            <View style={{ flex: 1 ,margin:5}}>
                                {/* <Text style={{ fontFamily: constants.fontFamily.mulish_regular, 
                                paddingLeft:10, fontSize: 15,color:theme.SEGMENTED_TEXT_COLOR }} >Set a 4 digit number as a your pin</Text> */}
                                <View style={{ marginTop: normalizeY(20) }}>
                                   <Text style={{fontFamily:mulish_bold,fontSize:18,fontStyle:"normal",marginLeft: normalizeX(10),color:theme.LABEL_COLOR}} >Interac e-Transfer</Text>
                                    {/* main container */}
                             {/* label */}
                     
                        <View style={{ paddingHorizontal: normalizeX(2), paddingTop: normalizeY(10) }}>
                        <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(10), color: theme.TEXTINPUT_LABEL_COLOR ,marginLeft:normalizeX(10)}]}>From</Text>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), flex: 1}}>
                            <View style={{ justifyContent:"flex-start",flexDirection: "row", marginRight: normalizeX(20), flex: 0.9}}>

<View style={{ flex: 1, alignItems: "flex-start" }}>
<DropDownPicker
                            items={[
                         
                                { label: 'Mail Offer', value: 'mail' },
                                { label: 'Friends Or Family', value: 'friends' },
                                { label: 'Search Engine', value: 'SearchEngine' },
                                { label: 'Facebook Ad or Video', value: 'Facebook' },
        
                            ]}
                            defaultValue={this.state.selectedValue}
                            placeholder="Albert Flores"
                            placeholderTextColor={theme.LABEL_COLOR}
                            labelStyle={{
                                fontSize: 15,
                                color: "#000",
                            }}
                            selectedtLabelStyle={{
                                color: 'red'
                            }}
                            activeLabelStyle={{ color: 'red' }}
                            containerStyle={{ height: 40, width: "100%", borderWidth: 0,}}
                            style={{ borderWidth: 0,}}
                            itemStyle={{
                                justifyContent: 'flex-start',
                                
                            }}
                            dropDownStyle={{  }}
                            onChangeItem={item => this.setState({selectedValue:item.value})}
                        />
</View>

</View>
<View style={{flex:0.12,paddingBottom: normalizeY(20), marginRight: normalizeX(15)}}>
    <TouchableOpacity style={styles.add}   onPress={() => { this.setModalVisible(true )}}>
    <Feather
        style={{  fontFamily: mulish_bold }}
        name="plus"
        color="#fff"
        size={20}
        fontFamily={mulish_bold}
    />
    </TouchableOpacity>
</View>

                            </View>
                       
                            {/* border styles */}
                            <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, width:"73%",marginTop:normalizeY(-30),marginLeft:normalizeX(10)}]} ></View>
                        </View>
                         {/* main container */}
                         <View style={{ paddingHorizontal: normalizeX(5),marginTop:normalizeY(10),paddingTop:normalizeY(10) }}>
                            {/* label */}
                            <Text style={[signUpScreenStyles.name_style,{ paddingTop:normalizeY(10),marginTop:normalizeY(10),color:theme.TEXTINPUT_LABEL_COLOR }]}> Amount</Text>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), }}>

                                <TextInput
                                   placeholder="$20.00"
                                   placeholderTextColor={theme.LABEL_COLOR}
                                    style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                    autoCapitalize="none"
                                    // onChangeText={(val) => this.textInputChange(val)}
                                />
                            </View>
                            {/* border styles */}
                            <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                        </View>
        {/* main container */}
        <View style={{ paddingHorizontal:normalizeX(5) }}>
                            {/* label */}
                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <View style={{ flex: 1.3, alignItems: "flex-start" }}>
                                    <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(20), color: theme.TEXTINPUT_LABEL_COLOR }]}>Request Details</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(20), color: "#a1c452", fontFamily: mulish_regular, fontSize: 16 }]}>Optional</Text>
                                </View>
                            </View>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), }}>
                                <TextInput
                                   placeholder="Type request details here"
                                   placeholderTextColor={theme.LABEL_COLOR}
                                    style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                    autoCapitalize="none"
                                    // onChangeText={(val) => textInputChange(val)}
                                />
                            </View>
                            {/* border styles */}
                            <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                        </View>
                         {/* main container */}
                         <View style={{ paddingHorizontal: normalizeX(6) }}>
                            {/* label */}
                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <View style={{ flex: 1.3, alignItems: "flex-start" }}>
                                    <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(20), color: theme.TEXTINPUT_LABEL_COLOR }]}>Request Due Date</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(20), color: "#a1c452", fontFamily: mulish_regular, fontSize: 16 }]}>Optional</Text>
                                </View>
                            </View>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), }}>
                                <TextInput
                                   placeholder={new Date().toLocaleDateString()}
                                   placeholderTextColor={theme.LABEL_COLOR}
                                    style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                    autoCapitalize="none"
                                    // onChangeText={(val) => textInputChange(val)}
                                />
                            </View>
                            {/* border styles */}
                            <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                        </View>
  {/* main container */}
  <View style={{ paddingHorizontal: 5 }}>
                            {/* label */}
                            <Text style={[signUpScreenStyles.name_style,{ paddingTop: normalizeY(10),marginTop: normalizeY(10),color:theme.TEXTINPUT_LABEL_COLOR }]}>Notify by</Text>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), }}>
                                <TextInput
                                placeholder="Email"
                                placeholderTextColor={theme.LABEL_COLOR}
                                    style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                    autoCapitalize="none"
                                    // onChangeText={(val) => this.textInputChange(val)}
                                />
                            </View>
                            {/* border styles */}
                            <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                        </View>
{/* main container */}
<View style={{ paddingHorizontal:5 }}>
                            {/* label */}
                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <View style={{ flex: 1.3, alignItems: "flex-start" }}>
                                    <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(20), color: theme.TEXTINPUT_LABEL_COLOR }]}>Message </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(20), color: "#a1c452", fontFamily: mulish_regular, fontSize: 16 }]}>Optional</Text>
                                </View>
                            </View>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), }}>
                                <TextInput
                                   placeholder="Pizza"
                                   placeholderTextColor={theme.LABEL_COLOR}
                                    style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                    autoCapitalize="none"
                                    // onChangeText={(val) => textInputChange(val)}
                                />
                            </View>
                            {/* border styles */}
                            <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                        </View>
                          {/* main container */}
  <View style={{ paddingHorizontal: 5 }}>
                            {/* label */}
                            <Text style={[signUpScreenStyles.name_style,{ paddingTop:normalizeY(10),marginTop:normalizeY(10),color:theme.TEXTINPUT_LABEL_COLOR }]}>Your Email</Text>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), }}>

                                <TextInput
                                        placeholder="albert.flores@gmail.com"
                                        placeholderTextColor={theme.LABEL_COLOR}
                                    style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                    autoCapitalize="none"
                                    // onChangeText={(val) => this.textInputChange(val)}
                                />
                            </View>
                            {/* border styles */}
                            <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                        </View>
                        <View style={[signUpScreenStyles.button, { marginTop: 15, paddingTop: 20 }]}>
                        <Button style={{marginTop: 10}} title="Send Money"/>
                        </View>
                                </View>
                                
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={{

                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}>
                            <View style={{ marginTop: normalizeY(40), paddingTop: normalizeY(40), flex: 1 }}>
<Text style={{color:theme.LABEL_COLOR}}>History tab design not provided yet</Text>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
 add:{
    height:42,
    width:42,
    backgroundColor:"#FECF31",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    marginTop:normalizeY(-3)
 },
 modalView: {
    margin: 15,paddingLeft:normalizeX(10),
    backgroundColor: theme.MODAL_BACKGROUND_COLOR,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: normalizeY(15),
    textAlign: "center"
  }
})