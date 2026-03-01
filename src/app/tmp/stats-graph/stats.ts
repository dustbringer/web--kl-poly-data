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
    xlabel: "Number of verticies (up to)",
    ylogscale: false,
    yrange: [0, 100 + 5],
    legend: {
      yanchor: "bottom",
      y: 0.01,
      xanchor: "left",
      x: 0.01,
    },
    columns: ["characteristic", "chromatic", "tutte"],
    abbreviate: false,
    columnsAbbr: ["char", "chrom", "tutte"],
    x: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    ys: [
      [
        // char
        100, 100, 100, 100, 99.29577464788733, 96.68341708542714,
        93.99768824306473, 90.57695686550119, 88.60262709112766,
      ],
      [
        // chrom
      ],
      [
        // tutte
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
