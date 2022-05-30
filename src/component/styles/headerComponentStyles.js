
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colorDarkGray, colorWhiteffffff, flex_direction_row } from '../../utils/Constants';
import theme from '../../utils/theme';


const styles = StyleSheet.create({
    header: {
        
        width: "100%",
        height: 65,
        backgroundColor: colorWhiteffffff,
        flexDirection: flex_direction_row,
        alignItems: "center",
        alignContent: "space-around",
        flex: 0.12,
        
    },
    backArrow: {
        width: "12%", height: 40, elevation:1, justifyContent: "center",
        alignItems: "center", backgroundColor: colorWhiteffffff, marginLeft: 20,
        borderRadius: 13,
        borderWidth: theme.BORDER_WIDTH,    
        borderColor: colorDarkGray,

    },
    headerText:{
        marginLeft:20
    }
})

export default styles;
