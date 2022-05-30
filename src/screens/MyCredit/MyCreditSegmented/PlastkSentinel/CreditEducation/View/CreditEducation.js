//import liraries
import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { normalizeX, normalizeY, normalizeFont } from '../../../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../../../component/common/Text'
import { useTheme } from '@react-navigation/native';
import YoutubeVideo from '../../YoutubeVideo'
import { getIsDarkModeEnabled, mulish_bold, mulish_regular } from '../../../../../../utils/Constants';
import { useSelector } from 'react-redux'
import CustomLoader from '../../../../../../component/common/CustomLoader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import Blogs from './Blogs';
import { CreditMeasures } from './CreditMeasures';







export default CreditEducation = (props) => {

  const myTheme = useTheme();

  const isLoading = useSelector(state => state.creditEducationReducer.isLoading)

  const [tabSelectedIndex, setTabSelectedIndex] = useState(0)


  const getSelectedTabData = () => {
    if(tabSelectedIndex === 0) {
      return (<Blogs navigation={props.navigation}/>)
    }
    else if (tabSelectedIndex === 1) {
      return (null)
    }
    else if(tabSelectedIndex === 2) {
      return (<CreditMeasures/>)
    }
  }



  
  return (

    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

      <View style={styles.body} >

        <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.weeklyPodcastConatainer}>

          <YoutubeVideo />
          <Text style={{ ...styles.weeklyPodcast, color: myTheme.colors.LABEL_COLOR, }}>Weekly Podcasts</Text>
        </LinearGradient>


        <SegmentedControlTab

          values={["Articles", "Podcasts", "Credit Measures"]}
          selectedIndex={tabSelectedIndex}
          onTabPress={index => setTabSelectedIndex(index)}
          tabStyle={{ backgroundColor: 'transparent', borderColor: getIsDarkModeEnabled() ? '#6574A0' : '#dfe1e9', borderWidth: 1 }}
          activeTabStyle={{ backgroundColor: "#FECF31" }}
          activeTabTextStyle={{ color: '#fafafb', fontWeight: '600', fontFamily: mulish_regular }}
          tabTextStyle={{ color: '#5d6a93', fontFamily: mulish_regular, fontWeight: '400', fontSize: normalizeFont(14), marginVertical: normalizeY(2) }}
          tabsContainerStyle={{ color: '#6574A0' }}
          firstTabStyle={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0, borderRadius: 10 }}
          lastTabStyle={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0, borderRadius: 10 }}
          borderRadius={10}

        />

        {getSelectedTabData()}

      </View>
      {isLoading &&
        <CustomLoader />
      }


    </LinearGradient>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: normalizeY(20),
    marginBottom: normalizeY(10),
    marginHorizontal: normalizeX(15),

  },
  weeklyPodcastConatainer: {
    height: 230,
    width: '100%',
    borderRadius: 16,
    elevation: 5,
    marginBottom: normalizeY(10)
  },
  weeklyPodcast: {
    margin: 20,
    fontFamily: mulish_bold,
    fontSize: normalizeFont(14),
  },


});
