export const optionsType: { [name: string]: string } = {
  ["a"]: "alternating",
  ["n"]: "non-alternating",
  ["t"]: "torus",
  ["s"]: "satellite",
  ["h"]: "hyperbolic",
};

export const optionsBool: { [name: string]: string } = {
  ["eulerian"]: "eulerian",
  ["semieulerian"]: "semieulerian",
  ["regular"]: "regular",
  ["planar"]: "planar",
  ["at_free"]: "at_free",
  ["chordal"]: "chordal",
  ["distance_regular"]: "distance_regular",
  ["strongly_regular"]: "strongly_regular",
  ["perfect_graph"]: "perfect_graph",
  ["biconnected"]: "biconnected",
  ["tree"]: "tree",
  ["threshold_graph"]: "threshold_graph",
  ["bipartite"]: "bipartite",
  ["hamiltonian-pseudo"]: "hamiltonian",
};

export const optionsVal: { [name: string]: string } = {
  ["nVertices"]: "nVertices",
  ["nEdges"]: "nEdges",
  ["radius"]: "radius",
  ["diameter"]: "diameter",
  ["girth"]: "girth",
  ["NEWgirth"]: "NEWgirth",
  ["harmonicDiameter"]: "harmonicDiameter",
  ["effectiveGraphResistance"]: "effectiveGraphResistance",
  ["kemeny"]: "kemeny-constant",
};
