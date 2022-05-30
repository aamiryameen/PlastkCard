//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../../component/common/Text'
import { normalizeX, normalizeY, normalizeFont } from "../../../utils/Utils";
import { mulish_bold, mulish_regular, GREY, RED, DARK_GREY, colorWhiteffffff, mulish_medium, ligh_green, gray } from '../../../utils/Constants'
import { Icon, Steps, WingBlank, } from '@ant-design/react-native';
import Feather from 'react-native-vector-icons/Feather';

// create a component
export default StepsComponent = (props) => {

  const stepsItem =
    [
      { index: '1' },
      { index: '2' },
      { index: '3' },
      { index: '4' },
      { index: '5' }

    ]

  const renderSteps = () => {

    return stepsItem.map((items, index) => {

      return (

        <React.Fragment key={index}>
          {
            props.current >= index ? <View>

              <Feather size={18} name="check-circle" color={props.current >= index ? ligh_green : GREY} />
            </View> : <View>

                <Feather size={18} name="circle" color={props.current >= index ? ligh_green : GREY} />
              </View>
          }
          {
            index <= 3 ? <View
              style={{
                borderBottomColor: props.current >= index ? ligh_green : GREY,
                borderBottomWidth: 1,
                width: "18%",
                marginBottom: 8
              }}
            /> : null
          }

        </React.Fragment>
      )

    })


  }


  return (

    <View style={styles.stepsContainer}>
      {renderSteps()}
    </View>

  );
};

// define your styles
const styles = StyleSheet.create({

  stepsContainer: {
    flexDirection: "row",
    marginHorizontal: normalizeX(14)
  },

});

