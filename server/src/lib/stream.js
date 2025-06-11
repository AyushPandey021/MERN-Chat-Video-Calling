import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = "6aathmrnp4x2";
const apiSecret ="w94zy2xtv5ubj9qqhb4w5rzv4dj4jsrmeq7mn52vg8satbfx5d99gcqpxzp3prx2" ;

// console.log("STREAM_API_KEY =", process.env.STREAM_API_KEY);
// console.log("STREAM_API_SECRET =", process.env.STREAM_API_SECRET);

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
