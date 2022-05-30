import React, { PureComponent } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native'
import TextInput from './TextInput';
import { color } from 'react-native-reanimated';
import { GREY } from '../../utils/Constants';

export default class Picker extends PureComponent {

  state = {
    selectedValue: '',
    label: '',
  }

  handleValueChange = (value, index) => {
    const label = index < 1 ? '' : this.props.values[index - 1].label;
    this.setState({ selectedValue: value, label });
    this.props.onChange(value);
  }

  render() {
    const { containerStyle, style, placeholder, values, icon, fontawesome,downIcon , theme , title, disablePicker} = this.props;
    const { label } = this.state;

    let temp = ''

    if(label !== '' && label !== null && label !== undefined)
      temp = label
    else if(title !== null && title !== '' && title !== undefined)
      temp = title

    return (
      <View style={containerStyle}>
        <RNPickerSelect
        placeholder={{label: "Please select an item", color: GREY}}
          onValueChange={(v, i) => this.handleValueChange(v, i)}
          disabled={disablePicker}
          items={values}>
          <TextInput icon={icon}    downIcon={downIcon}  theme={theme} fontawesome={fontawesome} value={temp} style={style} placeholder={placeholder} />
        </RNPickerSelect>
      </View>

    );
  }
}