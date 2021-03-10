import React from "react";
import ChartsWeekScreen from "./ChartsWeekScreen";
import ChartsMonthScreen from "./ChartsMonthScreen";
import ChartsYearScreen from "./ChartsYearScreen";
import { connect } from "react-redux";
import { View, Text } from "react-native";

function ChartScreen({ chartstep }) {
  switch (chartstep) {
    case 1:
      return (
        <View>
          <ChartsWeekScreen />
        </View>
      );
    case 2:
      return (
        <View>
          <ChartsMonthScreen />
        </View>
      );
    case 3:
      return (
        <View>
          <ChartsYearScreen />
        </View>
      );
    default:
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return { chartstep: state.chartstep };
};

export default connect(mapStateToProps, null)(ChartScreen);
