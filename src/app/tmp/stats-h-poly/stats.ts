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
    xlabel: "Dimension (up to)",
    ylogscale: false,
    yrange: [0, 100 + 5],
    legend: {
      yanchor: "bottom",
      y: 0.01,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [
      [
        80, 69.56521739130434, 68.70748299319727, 80.84896347482724,
        90.67747539085119, 95.24792622170575,
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
    xlabel: "Dimension (up to)",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [[7, 31, 490, 6540, 184184, 5715816]],
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
    xlabel: "Dimension (up to)",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [
      [
        5.6, 19.391304347826086, 208.2108843537415, 1739.5844027640671,
        28538.08176027794, 379561.00384467986,
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
    xlabel: "Dimension (up to)",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [[9, 64, 800, 14762, 354312, 14070330]],
    showSuccessiveQuotients: true,
  },
  avgSumAbs: {
    ylabel: "Average coeffcient sum (log scale)",
    xlabel: "Dimension (up to)",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [
      [
        7.6, 39.56521739130435, 347.9251700680272, 3944.678183613031,
        55699.24423856398, 938835.6227021548,
      ],
    ],
  },
  maxAvgAbs: {
    ylabel: "Maximum average coefficient (log scale)",
    xlabel: "Dimension (up to)",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [[3, 16, 160, 2460.3333333333335, 50616, 1758791.25]],
  },
  avgAvgAbs: {
    ylabel: "Average average coefficient (log scale)",
    xlabel: "Dimension (up to)",
    ylogscale: true,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [
      [
        2.533333333333333, 10.028985507246377, 69.91609977324264,
        659.1773609740037, 7968.256128160594, 117461.82596848435,
      ],
    ],
  },
  maxSpread: {
    ylabel: "Maximum spread",
    xlabel: "Dimension (up to)",
    ylogscale: false,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [[3, 4, 5, 6, 7, 8]],
  },
  avgSpread: {
    ylabel: "Average spread",
    xlabel: "Dimension (up to)",
    ylogscale: false,
    legend: {
      yanchor: "top",
      y: 0.99,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["h-poly"],
    abbreviate: false,
    columnsAbbr: ["h"],
    x: [2, 3, 4, 5, 6, 7],
    ys: [
      [
        3, 3.782608695652174, 4.809523809523809, 5.827245804540968,
        6.862420382165605, 7.878564982507324,
      ],
    ],
  },
});

export default stats;
