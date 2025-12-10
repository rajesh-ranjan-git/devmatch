import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";

import {
  app,
  bannerFonts,
  bannerThemes,
  errorMessages,
} from "../config/config.js";
import { randomItem } from "../utils/utils.js";

const systemInfo = (port = process.env.BRAINBOX_PORT) => {
  const info = `
    Node: ${process.version}
    Port: ${port}
    Mode: ${process.env.NODE_ENV}
    Time: ${new Date().toLocaleString()}
  `;

  return boxen(info, {
    padding: { top: 0.5, right: 5, bottom: 0.5, left: 0.5 },
    borderColor: "cyan",
    borderStyle: "round",
  });
};

export const showDevMatchBanner = async (port = process.env.BRAINBOX_PORT) => {
  try {
    const banner = randomItem(bannerThemes);
    const bannerGradient = gradient(banner.gradient);
    const bannerDesc = randomItem(bannerThemes);
    const bannerDescGradient = gradient(bannerDesc.gradient);

    figlet.text(
      app.name.toUpperCase(),
      { font: bannerFonts.ansiShadow },
      async (error, data) => {
        const output = bannerGradient.multiline(data);
        const desc = bannerDescGradient.multiline(app.desc);
        const sysInfo = systemInfo(port);

        console.log(`\n\n${output}\n${desc}\n\n${sysInfo}\n`);
      }
    );
  } catch (error) {
    console.warn(
      `⚠️  WARNING :: ${errorMessages.BANNER_ERROR} : ${error.message}`
    );
    return;
  }
};
