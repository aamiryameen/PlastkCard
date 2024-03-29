import React from 'react'

import {View, ActivityIndicator, StyleSheet} from 'react-native'

export default CustomLoader = () => {

    return (

        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}


const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20
       
      }
})