"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import Plot from "react-plotly.js";
// // Plotly nextjs ssr issue fix: https://github.com/plotly/react-plotly.js/issues/272
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import * as d3 from "d3";

import Container from "@/components/Container";
import Link from "@/components/Link";
import Accordion from "@/components/Accordion";
import Radios from "@/components/Radios";

import { max, min, range } from "@/util/array-util";
import staticify from "@/util/staticURLs";

const options: {
  [name: string]: {
    display: string;
    diameter: number;
  };
} = {
  ["kl-1-9"]: { display: "KL", diameter: 7354.130744010472 },
  ["h-1-9"]: { display: "H", diameter: 75143.73123241603 },
};

type SavedPH = {
  [inv: string]: {
    h0: Array<[number, number]>;
    h1: Array<[number, number]>;
    h0Inf: Array<[number, number]>;
    h1Inf: Array<[number, number]>;
    plotMax: number;
  };
};

const updateData = (name: string, savedPH: { current: SavedPH }) => {
  if (savedPH.current[name] === undefined) {
    console.log(`Fetching ph data for ${name}`);
    return Promise.all([
      fetch(
        staticify(`/static/persistent-homology/points-${name}-pca13.h0.out`),
      ),
      fetch(
        staticify(`/static/persistent-homology/points-${name}-pca13.h1.out`),
      ),
    ])
      .then((res) => Promise.all(res.map((r) => r.text())))
      .then((res) => {
        const h0 = res[0]
          .trim()
          .split("\n")
          .map(
            (line) =>
              line
                .split(";")
                .map((nStr) => (nStr === "inf" ? Infinity : Number(nStr))) as [
                number,
                number,
              ],
          );
        const h1 = res[1]
          .trim()
          .split("\n")
          .map(
            (line) =>
              line
                .split(";")
                .map((nStr) => (nStr === "inf" ? Infinity : Number(nStr))) as [
                number,
                number,
              ],
          );

        const h0maxX = max(
          h0
            .filter((xy) => xy[0] !== Infinity && xy[1] !== Infinity)
            .map(([x, _]) => x),
        );
        const h0maxY = max(
          h0
            .filter((xy) => xy[0] !== Infinity && xy[1] !== Infinity)
            .map(([_, y]) => y),
        );
        const h1maxX = max(
          h1
            .filter((xy) => xy[0] !== Infinity && xy[1] !== Infinity)
            .map(([x, _]) => x),
        );
        const h1maxY = max(
          h1
            .filter((xy) => xy[0] !== Infinity && xy[1] !== Infinity)
            .map(([_, y]) => y),
        );
        savedPH.current[name] = {
          h0: h0.filter((xy) => xy[0] !== Infinity && xy[1] !== Infinity),
          h1: h1.filter((xy) => xy[0] !== Infinity && xy[1] !== Infinity),
          h0Inf: h0.filter((xy) => xy[0] === Infinity || xy[1] === Infinity),
          h1Inf: h1.filter((xy) => xy[0] === Infinity || xy[1] === Infinity),
          plotMax: max([h0maxX, h1maxX, h0maxY, h1maxY]),
        };
        return savedPH.current[name];
      });
  } else {
    return Promise.resolve(savedPH.current[name]);
  }
};

export default function PersistentHomologyPage() {
  const savedPH = React.useRef<SavedPH>({});
  const [phInv1, setPhInv1] = React.useState<string>("kl-1-9");
  const [phInv2, setPhInv2] = React.useState<string>("h-1-9");

  // Plot
  const [revise, setRevise] = React.useState<number>(0);
  const [plotMax, setPlotMax] = React.useState<number>(0);

  React.useEffect(() => {
    Promise.resolve()
      .then(() => setRevise(0))
      .then(() => {
        return updateData(phInv1, savedPH);
      })
      .finally(() => {
        console.log("Done");
        setRevise(1);
      });
  }, [phInv1]);

  React.useEffect(() => {
    Promise.resolve()
      .then(() => setRevise(2))
      .then(() => {
        return updateData(phInv2, savedPH);
      })
      .finally(() => {
        console.log("Done");
        setRevise(3);
      });
  }, [phInv2]);

  React.useEffect(() => {
    // Update the position of "infininty"
    if (revise === 0) {
      return;
    }
    setPlotMax(
      min([
        100,
        max(
          [phInv1, phInv2]
            .map(
              (name) =>
                Number(
                  savedPH.current?.[name]?.plotMax / options[name].diameter,
                ) *
                100 *
                1.2,
            )
            .filter((val) => !isNaN(val)),
        ),
      ]),
    );
    setRevise(0);
  }, [revise, phInv1, phInv2]);

  const yLog = false;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Persistent Homology
      </Typography>

      <Typography variant="body1">
        Select invariants for persistence graph.
      </Typography>
      <div
        style={{
          margin: "0.5em",
        }}
      >
        <Radios
          title="First"
          options={Object.entries(options).map(([k, v]) => ({
            name: v.display,
            value: k,
          }))}
          value={phInv1}
          onChange={(e) => setPhInv1((e.target as HTMLInputElement).value)}
        />
        <Radios
          title="Second"
          options={Object.entries(options).map(([k, v]) => ({
            name: v.display,
            value: k,
          }))}
          value={phInv2}
          onChange={(e) => setPhInv2((e.target as HTMLInputElement).value)}
        />
      </div>

      <Plot
        data={[
          {
            x: [-100 * 2, 100 * 2],
            y: [-100 * 2, 100 * 2],
            mode: "lines",
            line: {
              dash: "dot",
              color: "gray",
            },
            // Don't show it as a trace
            showlegend: false,
            hoverinfo: "skip",
          },
          {
            x: [-100 * 2, 100 * 2],
            y: [plotMax, plotMax],
            mode: "lines",
            line: {
              dash: "dot",
              color: "gray",
            },
            // Don't show it as a trace
            showlegend: false,
            hoverinfo: "skip",
          },
          ...[phInv1, phInv2]
            .map((name) => [
              {
                mode: "markers",
                x: [
                  ...(savedPH.current[name]?.["h0"]?.map(
                    ([x, _]) => (x / options[name].diameter) * 100,
                  ) || []),
                  ...(savedPH.current[name]?.["h0Inf"]?.map(([x, _]) =>
                    x !== Infinity
                      ? (x / options[name].diameter) * 100
                      : plotMax,
                  ) || []),
                ],
                y: [
                  ...(savedPH.current[name]?.["h0"]?.map(
                    ([_, y]) => (y / options[name].diameter) * 100,
                  ) || []),
                  ...(savedPH.current[name]?.["h0Inf"]?.map(([_, y]) =>
                    y !== Infinity
                      ? (y / options[name].diameter) * 100
                      : plotMax,
                  ) || []),
                ],
                name: `${name}-h0`,
              },
              {
                mode: "markers",
                x: [
                  ...(savedPH.current[name]?.["h1"]?.map(
                    ([x, _]) => (x / options[name].diameter) * 100,
                  ) || []),
                  ...(savedPH.current[name]?.["h1Inf"]?.map(([x, _]) =>
                    x !== Infinity
                      ? (x / options[name].diameter) * 100
                      : plotMax,
                  ) || []),
                ],
                y: [
                  ...(savedPH.current[name]?.["h1"]?.map(
                    ([_, y]) => (y / options[name].diameter) * 100,
                  ) || []),
                  ...(savedPH.current[name]?.["h1Inf"]?.map(([_, y]) =>
                    y !== Infinity
                      ? (y / options[name].diameter) * 100
                      : plotMax,
                  ) || []),
                ],
                name: `${name}-h1`,
              },
            ])
            .flat(),
        ]}
        config={{
          scrollZoom: true,
        }}
        layout={{
          dragmode: "pan",
          legend: {
            yanchor: "bottom",
            y: 0.01,
            xanchor: "right",
            x: 0.99,
          },
          colorway: [...d3.schemePaired],
          xaxis: {
            type: "linear",
            zeroline: false,
            range: [-plotMax / 20, plotMax * 1.1],
            title: "Birth",
          },
          yaxis: {
            type: "linear",
            zeroline: false,
            range: [-plotMax / 20, plotMax * 1.1],
            title: "Death",
          },
          datarevision: revise,
        }}
        useResizeHandler={true}
        style={{ maxWidth: `1000px`, height: `800px` }}
      />
    </Container>
  );
}
