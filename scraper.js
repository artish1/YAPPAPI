const axios = require("axios");
const cheerio = require("cheerio");

const ocean_name = "emerald";
const pirate_name = "Hera";

async function getPirateCrew(pirate_name, ocean_name) {
  const url = `http://${ocean_name}.puzzlepirates.com/yoweb/pirate.wm?target=${pirate_name}&classic=$classic`;
  const response = await axios.get(url);

  const $ = cheerio.load(response.data);
  const font_elements = $("font");

  const status = font_elements.first();

  const crew = status.find("b a");
  return crew.text();
}

module.exports = {
  getPirateCrew,
};
