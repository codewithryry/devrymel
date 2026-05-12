export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed"
    });
  }

  const cobaltApiUrl =
    process.env.COBALT_API_URL || "https://cobalt-api-w1ns.onrender.com";

  const cobaltApiKey = process.env.COBALT_API_KEY || "";

  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (cobaltApiKey) {
      headers.Authorization = `Api-Key ${cobaltApiKey}`;
    }

    const response = await fetch(cobaltApiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Cobalt request failed"
    });
  }
}