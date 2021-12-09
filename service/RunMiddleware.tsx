import { NextApiRequest, NextApiResponse } from "next";

const RunMiddleware = (middleware: any) => {
  console.log(typeof middleware);
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        console.log(typeof result);
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export default RunMiddleware;
