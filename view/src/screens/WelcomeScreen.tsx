/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useRef, useEffect, useContext } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { View, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const WelcomeVideoScreen = ({ navigation }: any) => {
  const video = useRef<Video>(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (token) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [token]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={require('../../assets/welcome.mp4')}
        style={StyleSheet.absoluteFillObject}
        shouldPlay
        isLooping={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => {
          if (!status.isLoaded) return;

          if (status.didJustFinish) {
            if (token) {
              navigation.replace('Home');
            } else {
              navigation.replace('Login');
            }
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeVideoScreen;
