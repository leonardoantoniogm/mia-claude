import type { NextApiRequest, NextApiResponse } from "next";

// Checks Basic Auth credentials on an admin route. Returns true if valid;
// otherwise writes a 401 and returns false so the caller can bail out.
export function requireAdmin(req: NextApiRequest, res: NextApiResponse): boolean {
  const header = req.headers.authorization ?? "";
  const [scheme, encoded] = header.split(" ");

  if (scheme !== "Basic" || !encoded) {
    res.setHeader("WWW-Authenticate", 'Basic realm="MIA Admin"');
    res.status(401).json({ error: "Autenticación requerida" });
    return false;
  }

  const [user, pass] = Buffer.from(encoded, "base64").toString().split(":");

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Credenciales inválidas" });
    return false;
  }

  return true;
}
