"use client";

import * as React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Container from "@/components/Container";
import Link from "@/components/Link";
import Accordion from "@/components/Accordion";

import descriptions from "./descriptions";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Kazhdan–Lusztig Polynomial Data
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: ".5em" }}>
        This webpage contains various interactive plots and comparison tools
        that supplement the paper [
        <Link href="https://arxiv.org/abs/2412.01283">arXiv</Link>;{" "}
        <Link href="https://github.com/dtubbenhauer/kldata">GitHub</Link>].
        Further details and explanations can be found in the paper and GitHub
        pages.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: ".5em" }}>
        <strong>Notice!</strong> While the website probably works on phones,
        less care has been put into polishing the mobile experience.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: ".5em" }}>
        <strong>Warning!</strong> The <Link href="/bm">Ballmapper</Link> page
        and old versions of the website fetch large files (~30-50MB per figure).
        So beware if you have bandwidth limits or slow internet.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Website Map
      </Typography>
      <Typography variant="body1" component={"ul"} sx={{ margin: "0 0 1em" }}>
        <li>
          <Link href="/stats" inPlace>
            Stats
          </Link>
          <ul>
            {/* <li>
              <Link href="/stats/dist" inPlace>
                Distribution
              </Link>
            </li> */}
            {/* <li>
              <Link href="/stats/modp" inPlace>
                Mod p
              </Link>
            </li> */}
          </ul>
        </li>

        <li>
          <Link href="/roots" inPlace>
            Roots
          </Link>{" "}
          (coming soon)
        </li>
        <li>
          <Link href="/bm" inPlace>
            Ballmapper
          </Link>
        </li>
        <li>
          <Link href="/about" inPlace>
            About
          </Link>
        </li>
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: ".5em" }}>
        The analogous webpage for polynomial knot invariants can be found{" "}
        <Link href="https://dustbringer.github.io/web--knot-invariant-comparison">
          here
        </Link>
        .
      </Typography>

      <Typography variant="h5" gutterBottom>
        References and acknowledgements
      </Typography>
      <Typography variant="body1" component={"span"} gutterBottom>
        Papers (submitted after 2019) detailing invariants and techniques we
        used
        <ul>
          <li>
            P. Dłotko,{" "}
            <em>Ball mapper: a shape summary for topological data analysis</em>,{" "}
            2019 [<Link href="https://arxiv.org/abs/1901.07410">arXiv</Link>]
          </li>
        </ul>
      </Typography>

      <hr style={{ width: "300px", margin: "2em auto" }} />

      <Accordion title="Polynomial Details">
        <Typography variant="body1">
          Short descriptions of the polynomials and their abbreviations used in
          some plots.
        </Typography>
        <TableContainer
          sx={{
            margin: "1em auto",
            border: "1px solid lightgrey",
            borderRadius: "5px",
            width: "fit-content",
          }}
        >
          <Table size="small" sx={{ width: "auto" }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f0f0f0",
                }}
              >
                <TableCell sx={{ fontWeight: "600", borderBottomWidth: "3px" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "600", borderBottomWidth: "3px" }}>
                  Abbreivation
                </TableCell>
                <TableCell sx={{ fontWeight: "600", borderBottomWidth: "3px" }}>
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(descriptions).map((col, i) => (
                <TableRow key={`abbrTable-row${i}`}>
                  <TableCell key={`abbrTable-row${i},col${0}`}>{col}</TableCell>
                  <TableCell key={`abbrTable-row${i},col${1}`}>
                    {descriptions[col].abbr}
                  </TableCell>
                  <TableCell key={`abbrTable-row${i},col${2}`}>
                    {descriptions[col].description || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Accordion>
    </Container>
  );
}
