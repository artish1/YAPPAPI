const express = require("express");
const scraper = require("./scraper");
const server = express();

const port = process.env.PORT || 4000;

server.use(express.json());

server.get("/crew", async (req, res) => {
  // Get fields
  const { name, ocean } = req.body;
  if (!name || !ocean) {
    res
      .status(401)
      .json({ message: "name and ocean fields are required in the body" });
    return;
  }
  try {
    const crew = await scraper.getPirateCrew(name, ocean);
    res.status(200).json({ crew });
  } catch (err) {
    console.error("Error getting pirate crew: ", err);
    res.status(500).json({
      message: "Could not get pirate crew, there was an error on the server",
    });
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
