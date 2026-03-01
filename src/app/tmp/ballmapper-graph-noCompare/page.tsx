"use client";

import * as React from "react";

// import Plot from "react-plotly.js";
// // Plotly nextjs ssr issue fix: https://github.com/plotly/react-plotly.js/issues/272
import dynamic from "next/dynamic";
// const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

import * as d3 from "d3";

import Container from "@/components/Container";
import Radio from "@/components/Radios";
import Link from "@/components/Link";
import Accordion from "@/components/Accordion";
import Checkboxes from "@/components/Checkboxes";
import HorizontalRule from "@/components/styled/HorizontalRule";
import Tooltip from "@/components/Tooltip";
import Range from "@/components/Range";
import createGraphSVG, { colors as nodeColors, rgbToText } from "./graph-svg-sizeOnly";
import staticify from "@/util/staticURLs";
import { argFilter, max, min, sum } from "@/util/array-util";
import { lerp, rgbLerp } from "@/util/number";
import { optionsType, optionsBool, optionsVal } from "./coloring-options";

type NodeDatum = {
  id: number;
  size?: number;
  group: number;
} & d3.SimulationNodeDatum;
type LinkDatum = { value?: number } & d3.SimulationLinkDatum<NodeDatum>;

type SVGData = {
  container: d3.Selection<HTMLDivElement, undefined, null, undefined>;
  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  node: d3.Selection<
    d3.BaseType | SVGCircleElement,
    NodeDatum,
    SVGGElement,
    undefined
  >;
  link: d3.Selection<
    d3.BaseType | SVGLineElement,
    LinkDatum,
    SVGGElement,
    undefined
  >;
  drag: d3.DragBehavior<SVGSVGElement, undefined, undefined>;
  zoom: d3.ZoomBehavior<SVGSVGElement, undefined>;
  tooltip: d3.Selection<HTMLDivElement, undefined, null, undefined>;
};

// color interpolator
const colorRainbow = (n: number) =>
  d3.scaleSequential(d3.interpolateTurbo)(lerp(0.15, 0.9, n));

const optionsBM: { [name: string]: string } = {
  ["chPoly-2-10-e=0.3"]: "chPoly-2-10-e=0.3",
  ["chPoly-2-10-e=0.5"]: "chPoly-2-10-e=0.5",
};

export default function BallmapperPage() {
  const savedBM = React.useRef<{
    [inv: string]: { edge: string; pcblSize: string };
  }>({});
  const savedVals = React.useRef<{
    [inv: string]: Array<number>;
  }>({});
  const savedKnotTypes = React.useRef<Array<string>>([]);

  const [bmInv, setBmInv] = React.useState<string>("chPoly-2-10-e=0.3");
  const [bmLinks, setBmLinks] = React.useState<Array<LinkDatum>>([]);
  const [bmNodes, setBmNodes] = React.useState<Array<NodeDatum>>([]);
  const [bmPCBLSize, setBmPCBLSize] = React.useState<Array<number>>([]);
  const [bmMaxNodeSize, setBmMaxNodeSize] = React.useState<number>(0);
  const [bmLoaded, setBmLoaded] = React.useState<boolean>(false);
  const [lassoEnabled, setLassoEnabled] = React.useState<boolean>(false);
  const [svgRef, setSvgRef] = React.useState<HTMLDivElement | null>(null);
  const [svgData, setSvgData] = React.useState<SVGData>();
  const [selected, setSelected] = React.useState<{ [n: number]: boolean }>({});

  const [bmCmpInv, setBmCmpInv] = React.useState<string>("chPoly-2-10-e=0.5");
  const [bmCmpLinks, setBmCmpLinks] = React.useState<Array<LinkDatum>>([]);
  const [bmCmpNodes, setBmCmpNodes] = React.useState<Array<NodeDatum>>([]);
  const [bmCmpPCBLSize, setBmCmpPCBLSize] = React.useState<Array<number>>([]);
  const [bmCmpMaxNodeSize, setBmCmpMaxNodeSize] = React.useState<number>(0);
  const [bmCmpLoaded, setBmCmpLoaded] = React.useState<boolean>(false);
  const [svgCmpRef, setSvgCmpRef] = React.useState<HTMLDivElement | null>(null);
  const [svgCmpData, setSvgCmpData] = React.useState<SVGData>();

  const [checkedHighlight, setCheckedHighlight] = React.useState<{
    [s: string]: boolean;
  }>({});
  const [knotsText, setKnotsText] = React.useState<string>("");

  // Slider
  const [sliderLimit, setSliderLimit] = React.useState<number>(0);
  const [colorInfo, setColorInfo] = React.useState<{
    [index: number]: number;
  }>({});

  // Current colouring
  const [curColorType, setCurColorType] = React.useState<string>("");
  const [curColorName, setCurColorName] = React.useState<string>("");

  React.useEffect(() => {
    setBmLoaded(false);
    Promise.resolve()
      .then(() => {
        if (savedBM.current[bmInv] === undefined) {
          console.log(`Fetching bm for ${bmInv}`);
          return Promise.all([
            fetch(
              staticify(`/static/tmp/ballmapper-graph-noCompare/bm-${bmInv}.edge.out`),
            ),
            fetch(
              staticify(
                `/static/tmp/ballmapper-graph-noCompare/bm-${bmInv}.pcblsize.out`,
              ),
            ),
          ])
            .then((res) => Promise.all(res.map((r) => r.text())))
            .then((res) => {
              savedBM.current[bmInv] = { edge: res[0], pcblSize: res[1] };
              return { edge: res[0], pcblSize: res[1] };
            });
        } else {
          return Promise.resolve(savedBM.current[bmInv]);
        }
      })
      .then((data: { edge: string; pcblSize: string }) => {
        console.log(`Loading bm for ${bmInv}`);
        const edges = data.edge
          .trim()
          .split("\n")
          .map((line) => line.split(" ").map((n) => Number(n) - 1));
        const pcblSize = data.pcblSize.trim().split("\n").map(Number);

        // Make sure to change index from 1-based to 0-based
        setBmPCBLSize(pcblSize);
        setBmMaxNodeSize(max(pcblSize));
        setBmNodes(
          Array.from(Array(pcblSize.length).keys()).map((i) => ({
            id: i,
            group: 0,
            size: pcblSize[i],
          })),
        );

        setBmLinks(
          edges.map((edge) => ({
            source: edge[0],
            target: edge[1],
            value: 1,
          })),
        );
        setSelected([]);
      });
  }, [bmInv]);

  React.useEffect(() => {
    setBmCmpLoaded(false);
    Promise.resolve()
      .then(() => {
        if (savedBM.current[bmCmpInv] === undefined) {
          console.log(`Fetching bmCmp for ${bmCmpInv}`);
          return Promise.all([
            fetch(
              staticify(`/static/tmp/ballmapper-graph-noCompare/bm-${bmCmpInv}.edge.out`),
            ),
            fetch(
              staticify(
                `/static/tmp/ballmapper-graph-noCompare/bm-${bmCmpInv}.pcblsize.out`,
              ),
            ),
          ])
            .then((res) => Promise.all(res.map((r) => r.text())))
            .then((res) => {
              savedBM.current[bmCmpInv] = { edge: res[0], pcblSize: res[1] };
              return { edge: res[0], pcblSize: res[1] };
            });
        } else {
          return Promise.resolve(savedBM.current[bmCmpInv]);
        }
      })
      .then((data: { edge: string; pcblSize: string }) => {
        console.log(`Loading bmCmp for ${bmCmpInv}`);
        const edges = data.edge
          .trim()
          .split("\n")
          .map((line) => line.split(" ").map((n) => Number(n) - 1));
        const pcblSize = data.pcblSize.trim().split("\n").map(Number);

        // Make sure to change index from 1-based to 0-based
        setBmCmpPCBLSize(pcblSize);
        setBmCmpMaxNodeSize(max(pcblSize));
        setBmCmpNodes(
          Array.from(Array(pcblSize.length).keys()).map((i) => ({
            id: i,
            group: 0,
            size: pcblSize[i],
          })),
        );

        setBmCmpLinks(
          edges.map((edge) => ({
            source: edge[0],
            target: edge[1],
            value: 1,
          })),
        );
      });
    setCurColorType("");
    setCurColorName("");
  }, [bmCmpInv]);

  React.useEffect(() => {
    if (bmNodes.length === 0) {
      // stops accidentally rendering nothing (after rendering the correct thing)
      return;
    }

    const { container, svg, node, link, drag, zoom, tooltip } = createGraphSVG({
      inputNodes: bmNodes,
      inputLinks: bmLinks,
      width: 800,
      height: 800,
      maxNodeSize: bmMaxNodeSize,
      setSelected,
      ...{
        _forceSettings: !bmInv.startsWith("homflypt-e=0.5")
          ? {}
          : {
              charge: -100,
              // gravity: 0.8,
              linkDistance: 80,
              linkStrength: 0.2,
              linkIterations: 50,
              ticks: 20,
            },
      },
    });
    setSvgData({ container, svg, node, link, drag, zoom, tooltip });

    /******************** Draw svg ********************/
    // console.log(svg.node());
    svgRef?.replaceChildren(
      container.node() || "Ballmapper loaded with error...",
    );

    setBmLoaded(true);
  }, [svgRef, bmInv, bmNodes, bmLinks, bmMaxNodeSize]);

  React.useEffect(() => {
    const drag = svgData?.drag;
    const zoom = svgData?.zoom;
    if (!drag || !zoom) {
      return;
    }
    if (lassoEnabled) {
      drag.filter((e: DragEvent) => !e.ctrlKey && !e.shiftKey && !e.button);
      zoom.filter(
        (e) => ((e.ctrlKey || e.shiftKey) && !e.button) || e.type === "wheel",
      );
    } else {
      drag.filter((e: DragEvent) => (e.ctrlKey || e.shiftKey) && !e.button);
      zoom.filter(
        (e) => (!e.ctrlKey && !e.shiftKey && !e.button) || e.type === "wheel",
      );
    }
  }, [lassoEnabled, svgData]);

  React.useEffect(() => {
    if (bmCmpNodes.length === 0) {
      // stops accidentally rendering nothing (after rendering the correct thing)
      return;
    }

    const { container, svg, node, link, drag, zoom, tooltip } = createGraphSVG({
      inputNodes: bmCmpNodes,
      inputLinks: bmCmpLinks,
      width: 800,
      height: 800,
      maxNodeSize: bmCmpMaxNodeSize,
      setSelected: () => {},
      disableLasso: true,
      ...{
        _forceSettings: !bmCmpInv.startsWith("homflypt-e=0.5")
          ? {}
          : {
              charge: -100,
              // gravity: 0.8,
              linkDistance: 80,
              linkStrength: 0.2,
              linkIterations: 50,
              ticks: 20,
            },
      },
    });
    setSvgCmpData({ container, svg, node, link, drag, zoom, tooltip });

    /******************** Draw svg ********************/
    // console.log(svg.node());
    svgCmpRef?.replaceChildren(
      container.node() || "Ballmapper loaded with error...",
    );

    setBmCmpLoaded(true);
  }, [svgCmpRef, bmCmpInv, bmCmpNodes, bmCmpLinks, bmCmpMaxNodeSize]);

  return (
    <Container>
      {/* <Typography variant="body1">
        Supplement to <em>Big data comparison of quantum invariants</em> [
        <Link href="https://arxiv.org/abs/2503.15810">arXiv</Link>;{" "}
        <Link href="https://github.com/dtubbenhauer/quantumdata">GitHub</Link>
        ].
      </Typography> */}
      <div>
        <Typography variant="body1">
          Select invariant for output ballmapper.
        </Typography>
        <div
          style={{
            margin: "0.5em",
          }}
        >
          <Radio
            title="Output"
            options={Object.entries(optionsBM).map(([k, v]) => ({
              name: v,
              value: k,
            }))}
            value={bmCmpInv}
            onChange={(e) => setBmCmpInv((e.target as HTMLInputElement).value)}
          />
        </div>
        <Typography variant="body1">
          <em>Note:</em>
        </Typography>
        <ul style={{ margin: "0", marginBottom: "1em" }}>
          {/* <li>
            Ballmappers are either normalised with <TeX>\epsilon = 0.05</TeX>{" "}
            (with no coefficient scaling) or with <TeX>\epsilon = 0.3</TeX>{" "}
            (with 3rd root coefficient scaling).
          </li> */}
          <li>
            When there are no duplicates (&quot;nodupe&quot;), comparisons
            involving it will make no sense.
          </li>
        </ul>
        <Typography variant="body1">
          <i>Interactive</i> plot: zoom, pan, hover and select!
        </Typography>
        <ul style={{ margin: "0", marginBottom: "1em" }}>
          <li>
            Size of nodes (barely) indicates how many permutations inside.
          </li>
          <li>
            Hover over nodes to see their indexing and coverage (for comparison
            ballmapper).
          </li>
        </ul>
      </div>

      <Box
        sx={{
          // border: "1px solid black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div ref={(node) => setSvgCmpRef(node)} />
      </Box>
    </Container>
  );
}
