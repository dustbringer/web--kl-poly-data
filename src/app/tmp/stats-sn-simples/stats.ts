/*
// Code for transposing ys and "data"
const parse = (a) => {
  a = a.map(row => row.slice(1))
  const out = a[0].map((_,i) => a.map(row => row[i]) )
  return JSON.stringify(out);
} 
*/

const stats: {
  [name: string]: {
    ylabel: string;
    xlabel: string;
    ylogscale?: boolean;
    yrange?: [number, number];
    legend: {
      yanchor: "top" | "bottom";
      y: number;
      xanchor: "left" | "right";
      x: number;
    };
    columns: Array<string>;
    abbreviate?: boolean;
    columnsAbbr: Array<string>;
    x: Array<number>;
    ys: Array<Array<number>>;
    showSuccessiveQuotients?: boolean;
    successiveQuotientsLegend?: {
      yanchor: "top" | "bottom";
      y: number;
      xanchor: "left" | "right";
      x: number;
    };
  };
} = Object.freeze({
  unique: {
    ylabel: "Percentage of unique values (%)",
    xlabel: "Simples up to n",
    ylogscale: false,
    yrange: [0, 100 + 5],
    legend: {
      yanchor: "bottom",
      y: 0.01,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["p=2", "p=3", "p=4", "p=5"],
    abbreviate: false,
    columnsAbbr: ["2", "3", "4", "5"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    ys: [
      [
        // 2
        100, 50, 50, 33.333333333333336, 44.44444444444444, 38.46153846153846,
        50, 45.833333333333336, 53.125, 52.38095238095238, 59.25925925925926,
        57.971014492753625, 63.2183908045977, 63.30275229357798,
        67.6470588235294, 67.26190476190476, 70.87378640776699,
        71.03174603174604, 74.18300653594771,
      ],
      [
        // 3
        100, 33.333333333333336, 20, 22.22222222222222, 28.571428571428573,
        23.80952380952381, 26.666666666666668, 30.232558139534884,
        28.8135593220339, 32.098765432098766, 35.18518518518518,
        34.72222222222222, 37.234042553191486, 38.775510204081634,
        38.41269841269841, 40.0990099009901, 41.40625, 41.267387944358575,
        42.46913580246913,
      ],
      [
        // 4
        100, 33.333333333333336, 33.333333333333336, 20, 31.25, 32,
        35.13513513513514, 32.075471698113205, 37.333333333333336,
        39.42307692307692, 42.25352112676056, 41.145833333333336, 43.75,
        44.67455621301775, 46.27539503386004, 45.56521739130435,
        46.69365721997301, 47.20758693361433,
      ],
      [
        // 5
        100, 33.333333333333336, 33.333333333333336, 27.272727272727273,
        23.529411764705884, 25.925925925925927, 30, 33.898305084745765,
        36.904761904761905, 36.440677966101696, 38.888888888888886,
        40.54054054054054, 42.281879194630875, 43.46733668341709,
        43.23809523809524, 44.12191582002903, 44.966442953020135,
        45.674740484429066,
      ],
    ],
    showSuccessiveQuotients: true,
    successiveQuotientsLegend: {
      yanchor: "top",
      y: 1.1,
      xanchor: "right",
      x: 0.99,
    },
  },
});

export default stats;
