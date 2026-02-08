export type Link = {
  name: string;
  path: string;
};

const navLinks: Link[] = [
  { name: "Overview", path: "/" },
  // { name: "Detection", path: "/stats/detection" },
  { name: "Stats", path: "/stats" },
  // { name: "mod-p", path: "/stats/modp" },
  { name: "Roots", path: "/roots" },
  { name: "Ballmapper", path: "/tda/ballmapper" },
  { name: "About", path: "/about" },
  { name: "Knots", path: "https://dustbringer.github.io/web--knot-invariant-comparison" },
];

export default navLinks;
