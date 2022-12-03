import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

export const Heatmap = (props) => {
  return (
    <ResponsiveCalendar
      data={props.data}
      from="2022-01-01"
      to="2022-12-25"
      emptyColor="#eeeeee"
      maxValue={1}
      colors={["#ed6500"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      isInteractive={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};
