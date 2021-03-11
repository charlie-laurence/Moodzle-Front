import React, { useState } from "react";
import { View, ScrollView, Dimensions, StyleSheet, Text } from "react-native";

//Scrollview horizontale :
const ActivityCarousel = ({ activities }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  let slides = activities.length;
  const scrollWidth = 100 * slides;

  const defineCurrentSlide = (event) => {
    const { contentOffset } = event.nativeEvent;
    const { x } = contentOffset;
    // Passage du x & largeur de l'écran pour gérer les bulles :
    let quotient =
      Math.floor(Math.floor(x) / Math.floor(Dimensions.get("window").width)) +
      1;
    return quotient < 1 ? 1 : quotient;
  };

  let bullets = [];
  for (let i = 1; i <= slides; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: currentSlide === i ? 0.5 : 0.1,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        contentContainerStyle={{ width: `${scrollWidth}%` }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
        onScroll={(event) => setCurrentSlide(defineCurrentSlide(event))}
      >
        {activities.map((interval, index) => (
          <View key={index} style={styles.activityWrapper}>
            {interval}
          </View>
        ))}
      </ScrollView>
      <View style={{ ...styles.bullets, flex: 0.2 }}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  bullets: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
  activityWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: Dimensions.get("window").width,
    padding: 20,
  },
  textPagination: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ActivityCarousel;
