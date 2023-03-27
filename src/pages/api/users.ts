import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.headers.authorization !== "newToken") {
  //   return res.json({
  //     message: "sem autorização",
  //     header: req.headers.authorization,
  //     reqHeader: "newToken",
  //     doesMatch: req.headers.authorization === "newToken",
  //   });
  // }

  res.json([
    {
      id: "b37hf498h",
      username: "boysnoize",
      name: "Boys Noize",
      age: 23,
    },
    {
      id: "min2h828f",
      username: "skrillex",
      name: "Sonny Skrillex",
      age: 31,
    },
    {
      id: "mf90348h3",
      username: "martingarrix",
      name: "Martin Garrix",
      age: 26,
    },
  ]);
}
