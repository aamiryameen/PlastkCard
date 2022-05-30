import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text as RNText,
} from 'react-native';
import { TEXT } from '../../utils/Constants';
import { normalizeFont } from '../../utils/Utils';

export default class Text extends PureComponent {
  render() {
    const { center, right, style, bold, size, bolder, boldest, color, numberOfLines } = this.props;
    return (
      <RNText
        {...this.props}
        allowFontScaling={false}
        numberOfLines={numberOfLines}
        
        style={[
          styles.text,
          center && styles.center,
          right && styles.right,
          bold && styles.bold,
          bolder && styles.bolder,
          boldest && styles.boldest,
          size && { fontSize: normalizeFont(size, true) },
          color && { color },
          style
        ]}
      />
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: TEXT,
    fontSize: normalizeFont(12.5),
    fontFamily: "Mulish",
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },
  bold: {
    fontFamily: "Mulish-SemiBold",
  },
  bolder: {
    fontFamily: "Mulish-Bold",
  },
  boldest: {
    fontFamily: "Mulish-ExtraBold",
  }
})
