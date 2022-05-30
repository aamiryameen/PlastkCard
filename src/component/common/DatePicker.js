import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { normalizeFont, normalizeX, normalizeY } from "../../utils/Utils";
import Text from './Text';
import theme from '../../utils/theme'
import Moment from 'moment';
import { mulish_regular } from '../../utils/Constants';


export default class DatePicker extends PureComponent {

  state = {
    isDatePickerVisible: false,
    date: new Date()
  }

  isDefaultValueSet = false

  handleDateChange = (dateValue) => {

    this.setState({ date: dateValue })
    this.hideDatePicker()
  }



  hideDatePicker = () => {


    this.setState({ isDatePickerVisible: false });



  }

  showDatePicker = () => {

    this.setState({ isDatePickerVisible: true })

  }


  render() {

    const { style, placeholder, iconSize, onChange, theme, defaultValue, dateVisible } = this.props;

    const { date } = this.state;
    const formateDate = Moment(date).format('YYYY-MM-DD')
    const { isDatePickerVisible } = this.state;
    onChange(formateDate)

    if (defaultValue !== null && defaultValue !== undefined && defaultValue !== '' && !this.isDefaultValueSet) {
      this.isDefaultValueSet = true

      let newDate = new Date(defaultValue)

      newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset())

      setTimeout(() => {
        this.setState({ date: newDate })
      }, 250);

    }

    return (
      <View style={{ ...styles.container, ...style }}>
        <Text style={[styles.placeholderText, { color: theme.colors.TEXTINPUT_LABEL_COLOR }]}>{placeholder}</Text>
        <TouchableOpacity onPress={dateVisible ? this.showDatePicker : null} style={styles.iconInputContainer} activeOpacity={1} >
          <MaterialIcons
            name={'date-range'}
            color={theme.colors.LABEL_COLOR}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: theme.colors.LABEL_COLOR }]}>{Moment(date).format('YYYY-MMM-DD')}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          pickerContainerStyleIOS={{ color: theme.colors.LABEL_COLOR }}
          isVisible={isDatePickerVisible}
          mode="date"
          color={theme.colors.LABEL_COLOR}
          style={{ color: theme.colors.LABEL_COLOR }}
          date={date}
          onConfirm={this.handleDateChange}
          onCancel={this.hideDatePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
  },
  placeholderText: {
    fontSize: 12,
    color: theme.TEXTINPUT_LABEL_COLOR,
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalizeY(40) > 50 ? 50 : normalizeY(40),
    // backgroundColor: 'red',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: normalizeFont(12.5),
    fontFamily: mulish_regular,
    color: theme.LABEL_COLOR
  },
})