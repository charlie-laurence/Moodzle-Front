import React from "react";
import { Calendar } from "react-native-calendars";

export default function CalendarObj(props) {
    return (
    <Calendar
    style={{
      height: 220,
      marginBottom: 40,
      marginTop: 0,
      paddingTop: 0,
    }}
    theme={{
      calendarBackground: "#11ffee00",
    }}
    // Initially visible month. Default = Date()
    current={props.date}
    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
    monthFormat={"yyyy MM"}
    // Hide month navigation arrows. Default = false
    hideArrows={true}
    // Replace default arrows with custom ones (direction can be 'left' or 'right')
    renderArrow={(direction) => <Arrow />}
    // Do not show days of other months in month page. Default = false
    hideExtraDays={true}
    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
    // day from another month that is visible in calendar page. Default = false
    disableMonthChange={true}
    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
    firstDay={1}
    // Hide day names. Default = false
    hideDayNames={true}
    // Show week numbers to the left. Default = false
    showWeekNumbers={false}
    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
    onPressArrowLeft={(subtractMonth) => subtractMonth()}
    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
    onPressArrowRight={(addMonth) => addMonth()}
    // Disable left arrow. Default = false
    disableArrowLeft={true}
    // Disable right arrow. Default = false
    disableArrowRight={true}
    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
    disableAllTouchEventsForDisabledDays={true}
    // Replace default month and year title with custom one. the function receive a date as parameter.
    renderHeader={(date) => {
      /*Return JSX*/
    }}
    // Enable the option to swipe between months. Default = false
    markedDates={props.dataset}
  />
    )
}