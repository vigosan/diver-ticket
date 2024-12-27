import type { NextApiRequest, NextApiResponse } from "next";
import net from "node:net";
import EscPosEncoder from "esc-pos-encoder";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('ASDASDASD');
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { ip, message } = req.body;

  if (!ip || !message) {
    return res.status(400).json({ error: "IP and message are required" });
  }

  const client = new net.Socket();
  client.connect(9100, ip, () => {
    const encoder = new EscPosEncoder();
    const result = encoder.initialize().text(message).newline().encode();
    client.write(result);
    client.end();
    res.status(200).json({ success: true });
  });

  client.on("error", (err) => {
    console.error("Error connecting to printer:", err);
    res.status(500).json({ error: "Failed to connect to printer" });
  });
}
