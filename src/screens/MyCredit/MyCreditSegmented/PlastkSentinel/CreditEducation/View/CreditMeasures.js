import React from 'react'
import { View, StyleSheet} from 'react-native';
import { normalizeX, normalizeY, normalizeFont } from '../../../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../../../component/common/Text'
import { useTheme } from '@react-navigation/native';
import { ligh_green, mulish_bold } from '../../../../../../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const CreditMeasures = () => {

    const myTheme = useTheme();
    return (
        <View>

          <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.weeklyPodcastConatainer} >

            <View style={{ borderBottomWidth: 0.5, borderBottomColor: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(10), flexDirection: "row", justifyContent: 'space-around', marginHorizontal: normalizeX(10) }}>

              <Text style={{ ...styles.weeklyPodcast, color: myTheme.colors.LABEL_COLOR, marginHorizontal: normalizeX(10), fontSize: normalizeFont(19), marginLeft: 0 }}>35%</Text>
              <Text style={{ ...styles.weeklyPodcast, color: myTheme.colors.LABEL_COLOR, marginHorizontal: normalizeX(10) }}>Payment History</Text>
              <AntDesign
                name='down'
                color={ligh_green}
                size={20}
                style={{ marginTop: 22 }}
              />
            </View>

            <View style={{ borderBottomWidth: 0.5, borderBottomColor: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(10), flexDirection: "row", justifyContent: 'space-around', marginHorizontal: normalizeX(10) }}>
              <Text style={{ ...styles.weeklyPodcast, color: myTheme.colors.LABEL_COLOR, marginHorizontal: normalizeX(10), fontSize: normalizeFont(19), marginLeft: 0 }}>30%</Text>
              <Text style={{ ...styles.weeklyPodcast, color: myTheme.colors.LABEL_COLOR, marginHorizontal: normalizeX(10) }}>Utilization Ratio</Text>
              <AntDesign
                name='down'
                color={ligh_green}
                size={20}
                style={{ marginTop: 22 }}
              />
            </View>

          </LinearGradient>
          </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      marginHorizontal: normalizeX(7),
      marginTop: normalizeY(20),
      marginBottom: normalizeY(10)
    },
    weeklyPodcastConatainer: {
      height: 230,
      width: '100%',
      borderRadius: 16,
      elevation: 5,
      marginTop: normalizeY(15)
    },
    weeklyPodcast: {
      margin: 20,
      fontFamily: mulish_bold,
      fontSize: normalizeFont(14),
    },
  
  
  });