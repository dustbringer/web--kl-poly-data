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
    xlabel: "Type A",
    ylogscale: false,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [50, 12.5, 6.25, 3.2894, 1.4908, 0.9133, 0.6597, 0.5609, 0.5736, 0.667],
      [
        100, 50, 28.125, 13.81578947368421, 6.651376146788991,
        3.349120433017591, 1.9899636615331373, 1.3468194528637634,
        1.1569098088318914, 1.1501315262855094,
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
  uniqueLog: {
    ylabel: "Percentage of unique values (%)(log scale)",
    xlabel: "Type A",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [50, 12.5, 6.25, 3.2894, 1.4908, 0.9133, 0.6597, 0.5609, 0.5736, 0.667],
      [
        100, 50, 28.125, 13.81578947368421, 6.651376146788991,
        3.349120433017591, 1.9899636615331373, 1.3468194528637634,
        1.1569098088318914, 1.1501315262855094,
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
  maxMaxAbs: {
    ylabel: "Maximum coeffcient (log scale)",
    xlabel: "Type A",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [1, 1, 1, 2, 4, 15, 73, 460, 4176, 61582],
      [1, 1, 2, 4, 10, 44, 239, 1541, 17566, 278576],
    ],
    showSuccessiveQuotients: true,
    successiveQuotientsLegend: {
      yanchor: "top",
      y: 1.1,
      xanchor: "right",
      x: 0.99,
    },
  },
  avgMaxAbs: {
    ylabel: "Average maximum coeffcient (log scale)",
    xlabel: "Type A",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [1, 1, 1, 1.0328, 1.1674, 1.5155, 2.3468, 4.4089, 10.1068, 28.3259],
      [
        0.5, 0.75, 0.9687, 1.2368, 1.7305, 2.7939, 5.3101, 11.9843, 32.3072,
        104.5427,
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
  maxSumAbs: {
    ylabel: "Maximum coeffcient sum (log scale)",
    xlabel: "Type A",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [1, 1, 2, 4, 10, 44, 239, 1541, 17566, 278576],
      [1, 3, 8, 20, 80, 480, 3068, 25732, 352668, 6344206],
    ],
    showSuccessiveQuotients: true,
  },
  avgSumAbs: {
    ylabel: "Average coeffcient sum (log scale)",
    xlabel: "Type A",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [
        1, 1, 1.0625, 1.2631, 1.7362, 2.7949, 5.3102, 11.9843, 32.3072,
        104.5427,
      ],
      [
        0.5, 1.25, 2.7187, 5.6315, 11.8784, 26.8924, 67.7688, 194.6569,
        647.6827, 2525.8757,
      ],
    ],
  },
  maxAvgAbs: {
    ylabel: "Maximum average coefficient (log scale)",
    xlabel: "Type A",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [1, 1, 1, 1.5, 3, 7.3333, 29.875, 171.2222, 1351.2307, 17411],
      [1, 1, 1.6, 2.8571, 6.8181, 30, 153.4, 989.6923, 10686.909, 162671.9487],
    ],
  },
  avgAvgAbs: {
    ylabel: "Average average coefficient (log scale)",
    xlabel: "Type A",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [1, 1, 1, 1.0131, 1.0684, 1.2303, 1.6295, 2.5963, 5.0945, 12.4047],
      [
        0.5, 0.75, 0.9406, 1.1479, 1.5289, 2.3586, 4.3049, 9.3672, 24.4165,
        76.5625,
      ],
    ],
  },
  maxSpread: {
    ylabel: "Maximum spread",
    xlabel: "Type A",
    ylogscale: false,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [1, 1, 2, 3, 4, 6, 8, 10, 13, 16],
      [1, 3, 6, 10, 15, 21, 28, 36, 45, 55],
    ],
  },
  avgSpread: {
    ylabel: "Average spread",
    xlabel: "Type A",
    ylogscale: false,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["KL", "H"],
    abbreviate: false,
    columnsAbbr: ["KL", "H"],
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [1, 1, 1.0625, 1.2368, 1.5573, 2.0368, 2.6851, 3.5091, 4.5151, 5.7083],
      [1, 1.5, 2.6562, 4.5131, 6.9805, 9.981, 13.486, 17.4899, 21.9923, 26.994],
    ],
  },
  // maxAbsRoot: {
  //   ylabel: "Maximum absolute root",
  //   xlabel: "Type A",
  //   ylogscale: false,
  //   legend: {
  //     yanchor: "top",
  //     y: 0.99,
  //     xanchor: "left",
  //     x: 0.01,
  //   },
  //   columns: ["KL", "H"],
  //   abbreviate: false,
  //   columnsAbbr: ["KL", "H"],
  //   x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //   ys: [
  //     [
  //       1.1278, 1.1837, 1.1837, 1.2196, 1.2547, 1.4348, 1.7765, 1.7765, 1.7765,
  //       2.0162, 2.1548, 2.6858, 2.7322, 2.9737,
  //     ],
  //     [
  //       1, 2.618, 2.618, 2.618, 3.3165, 4.3902, 5.1069, 5.1903, 7.0507, 8.7946,
  //       10.0233, 14.26, 22.4258, 30.5071,
  //     ],
  //   ],
  // },
  // percentagePureRoots: {
  //   ylabel: "Percentage of real or purely imaginary roots (%)",
  //   xlabel: "Type A",
  //   ylogscale: false,
  //   yrange: [0, 100 + 5],
  //   legend: {
  //     yanchor: "top",
  //     y: 0.99,
  //     xanchor: "right",
  //     x: 0.99,
  //   },
  //   columns: ["KL", "H"],
  //   abbreviate: false,
  //   columnsAbbr: ["KL", "H"],
  //   x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //   ys: [
  //     [
  //       33.3333, 28.5714, 22.5806, 22.5806, 21.1267, 19.9004, 19.22, 19.0257,
  //       19.1843, 18.8636, 18.8596, 18.7889, 18.5564, 18.5997,
  //     ],
  //     [
  //       0, 50, 20, 30, 17.3913, 25, 21.5789, 22.0211, 20.7786, 20.958, 19.7378,
  //       20.0468, 19.3164, 19.4536,
  //     ],
  //   ],
  // },
  // percentageCircleRoots: {
  //   ylabel: "Percentage of roots with abs in [0.9, 1.1] (%)",
  //   xlabel: "Type A",
  //   ylogscale: false,
  //   yrange: [0, 100 + 5],
  //   legend: {
  //     yanchor: "top",
  //     y: 0.99,
  //     xanchor: "right",
  //     x: 0.99,
  //   },
  //   columns: ["KL", "H"],
  //   abbreviate: false,
  //   columnsAbbr: ["KL", "H"],
  //   x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //   ys: [
  //     [
  //       33.3333, 57.1428, 58.0645, 54.8387, 49.2957, 47.7611, 50.3249, 49.4842,
  //       49.5595, 48.8356, 48.4072, 48.6044, 47.916, 47.5652,
  //     ],
  //     [
  //       100, 50, 80, 50, 65.2173, 52.7777, 53.1578, 45.7013, 43.9272, 41.2244,
  //       39.19, 36.9571, 35.878, 34.3872,
  //     ],
  //   ],
  // },
});

export default stats;
