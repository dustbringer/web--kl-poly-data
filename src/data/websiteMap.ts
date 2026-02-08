export type Link = {
  name: string;
  path?: string;
  sub?: Link[];
};

const websiteMap: Link[] = [
  {
    name: "Stats",
    path: "/stats",
    // sub: [
    //   { name: "Distribution", path: "/stats/dist" },
    //   { name: "Mod p", path: "/stats/modp" },
    // ],
  },
  { name: "Roots", path: "/roots" },
  {
    name: "TDA",
    path: "/tda",
    sub: [
      {
        name: "Ballmapper",
        path: "/tda/ballmapper",
      },
      // { name: "k-Nearest neighbours", path: "/tda/k-nearest-neighbours" },
      // { name: "Persistent Homology", path: "/tda/persistent-homology" },
    ],
  },
  { name: "About", path: "/about" },
];

export default websiteMap;
