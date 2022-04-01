import Cors from "cors";
// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import geoip from "geoip-country";
import requestIp from "request-ip";

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const ip = requestIp.getClientIp(req);

  const geo = geoip.lookup(ip);
  res.status(200).json(geo);
}
