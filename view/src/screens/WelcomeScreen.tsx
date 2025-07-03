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
    }, 4000); // fallback in case video callback doesn't trigger

    return () => clearTimeout(timeout);
  }, [token]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={require('../../assets/welcome.mp4')}
        style={styles.video}
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
    borderRadius: 16,
  },
});

export default WelcomeVideoScreen;
