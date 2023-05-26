import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Clients", "Appointments", "Cases"],
  ["2019", 1000, 400, 200],
  ["2020", 1170, 460, 250],
  ["2021", 660, 1120, 300],
  ["2022", 1030, 540, 350],
  ["2023", 1030, 540, 350],
  ["2024", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Clients, Appointments, and Cases: 2019-2024",
  },
  colors: ["rgb(53,148,148)", "rgb(40,34,70)", "#188310"],
};

export function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
