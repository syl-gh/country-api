// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import geoip from "geoip-country";
import requestIp from "request-ip";

export default function handler(req, res) {
  const ip = requestIp.getClientIp(req);

  const geo = geoip.lookup(ip);
  res.status(200).json(geo);
}
