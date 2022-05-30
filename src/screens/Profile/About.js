import React, { useState, useEffect } from "react";
import {

  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { normalizeX, normalizeY, normalizeFont } from '../../utils/Utils'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native'
import { mulish_regular } from "../../utils/Constants";
import Text from '../../component/common/Text'

export default About = (props) => {

  const myTheme = useTheme();

  return (

    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>
      <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

      <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.textContainer}>

        <ScrollView indicatorStyle="white" style={{ flex: 1 }} >

          <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{`Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Risus
risus mauris cursus donec urna
tristique dictum volutpat. Metus,
tempus ut quisque in tincidunt
tristique nisi mi. Sed et vel nunc
nullam maecenas. Nec at nunc lacus
massa gravida mus et.

Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Risus
risus mauris cursus donec urna
tristique dictum volutpat. Metus,
tempus ut quisque in tincidunt
tristique nisi mi. Sed et vel nunc
nullam maecenas. Nec at nunc lacus
massa gravida mus et.

Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Aliquam,
suspendisse risus, turpis sed turpis
urna neque. Dictumst purus diam
venenatis pretium adipiscing turpis
risus donec consectetur. Augue sit
enim a, commodo ac tincidunt quis
risus pellentesque. Fusce vel feugiat
rhoncus malesuada. Est venenatis sit
egestas ullamcorper.`}

          </Text>
        </ScrollView>
      </LinearGradient>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({

  textContainer: {
    marginHorizontal: normalizeX(30),
    borderRadius: 10,
    flex: 0.96,
    marginVertical: normalizeY(15),
    elevation: 5,

  },
  textStyle: {
    fontFamily: mulish_regular,
    fontSize: normalizeFont(14),
    margin: 20

  }
})