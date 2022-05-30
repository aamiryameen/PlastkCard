
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import { FlatList } from 'react-native-gesture-handler';


export default YouTubeVideo = () => {

  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(null);
  const [quality, setQuality] = useState(null);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);


  const youtubePlayerRef = useRef();
  ;

  return (

    <View style={styles.container}>

      <YouTube
        ref={youtubePlayerRef}
        // You must have an API Key
        apiKey='AIzaSyDbO8TLYFwGWSuCC8TdMuavfRzYTmbo4Nk'
        videoId='CBhuAG5Y9w0'
        // playlistId="PLF797E961509B4EB5"
        autoplay={false}
        loop={false}
        fullscreen={false}
        style={
          {
            height: 170

          }}
        onError={(e) => setError(e.error)}
        onReady={(e) => setIsReady(true)}
        onChangeState={(e) => setStatus(e.state)}
        onChangeQuality={(e) => setQuality(e.quality)}
        onChangeFullscreen={(e) => setFullscreen(e.isFullscreen)}
        onProgress={(e) => {
          setDuration(e.duration);
          setCurrentTime(e.currentTime);
        }}
      />

    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});



