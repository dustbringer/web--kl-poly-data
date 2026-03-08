"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Container from "@/components/Container";
import Link from "@/components/Link";
import Accordion from "@/components/Accordion";

import { type Link as LinkT } from "@/data/websiteMap";

function generateLinks(ls: LinkT[]) {
  return (
    <>
      {ls.map((l, i) => (
        <li key={`li-${i}`}>
          {l.path !== undefined ? (
            <Link href={l.path} inPlace={l.path.startsWith("/")}>
              {l.name}
            </Link>
          ) : (
            l.name
          )}
          {l.sub !== undefined && l.sub.length > 0 && (
            <ul>{generateLinks(l.sub)}</ul>
          )}
        </li>
      ))}
    </>
  );
}

const websiteMapTmp: LinkT = {
  name: "Temporary",
  path: "/tmp",
  sub: [
    { name: "Stats (Graph)", path: "/tmp/stats-graph" },
    {
      name: "Stats (S_n simples)",
      path: "/tmp/stats-sn-simples",
    },
    { name: "Stats (h-poly)", path: "/tmp/stats-h-poly" },
    { name: "Ballmapper (Graph)", path: "/tmp/ballmapper-graph" },
    {
      name: "Ballmapper (Graph) (larger graphs)",
      path: "/tmp/ballmapper-graph-noCompare",
    },
    { name: "Ballmapper (S_n simples)", path: "/tmp/ballmapper-sn-simple" },
    { name: "Ballmapper (h-polys)", path: "/tmp/ballmapper-h-poly" },
  ],
};

export default function TmpPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Temporary Pages
      </Typography>

      <Typography variant="body1" component={"ul"} sx={{ margin: "0 0 1em" }}>
        {websiteMapTmp !== undefined &&
          websiteMapTmp.sub !== undefined &&
          generateLinks(websiteMapTmp.sub)}
      </Typography>
    </Container>
  );
}
