import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";

import { bannerFonts, bannerThemes, errorMessages } from "../config/config.js";
import { randomItem } from "../utils/utils.js";

const systemInfo = (port = 5000) => {
  const info = `
    Node: ${process.version}
    Port: ${port}
    Mode: ${process.env.NODE_ENV}
    Time: ${new Date().toLocaleString()}
  `;

  console.log(
    boxen(info, {
      padding: 1,
      margin: 1,
      borderColor: "cyan",
      borderStyle: "round",
    })
  );
};

export const showDevMatchBanner = async (port = 5000) => {
  try {
    const banner = randomItem(bannerThemes);
    const bannerGradient = gradient(banner.gradient);
    const bannerDesc = randomItem(bannerThemes);
    const bannerDescGradient = gradient(bannerDesc.gradient);

    figlet.text(
      "DEVMATCH",
      { font: bannerFonts.ansiShadow },
      async (error, data) => {
        const output = bannerGradient.multiline(data);
        console.log("\n" + output);
        const desc = bannerDescGradient.multiline(
          "Tinder for Software Engineers!"
        );
        console.log(desc);

        systemInfo(port);
      }
    );
  } catch (error) {
    console.error(
      `⚠️  WARNING :: ${errorMessages.BANNER_ERROR} : ${error.message}`
    );
    return;
  }
};
