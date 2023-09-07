import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";

export default function LoadingAnimation() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/sleeping_cat.json")}
        style={styles.animation}
        autoPlay
        loop
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:"center",
    alignItems:'center'
  },
  animation: {
    width: 150,
    height: 150,
  },
});