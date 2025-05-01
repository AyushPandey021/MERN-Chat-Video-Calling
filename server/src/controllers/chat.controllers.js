import { generateStreamToken } from "../lib/stream";

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error is get stream token:", error.console);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}
