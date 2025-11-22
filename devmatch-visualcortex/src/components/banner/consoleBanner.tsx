"use client";

import { useEffect } from "react";
import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";
import { BANNER_FONTS, BANNER_THEMES } from "@/config/constants";
import { getRandomItem } from "@/lib/utils/utils";
import { ConsoleBannerProps } from "@/types/propTypes";

const systemInfo = (nodeVersion: string) => {
  const info = `
    Node: ${nodeVersion}
    Port: ${process.env.NEXT_PUBLIC_VISUALCORTEX_PORT}
    Mode: ${process.env.NEXT_PUBLIC_NODE_ENV}
    Time: ${new Date().toLocaleString("en-US")}
  `;

  return boxen(info, {
    padding: { top: 0.5, right: 5, bottom: 0.5, left: 0.5 },
    borderColor: "cyan",
    borderStyle: "round",
  });
};

const ConsoleBanner = ({ nodeVersion }: ConsoleBannerProps) => {
  const banner = getRandomItem(BANNER_THEMES);
  const bannerGradient = gradient(banner.gradient);
  const bannerDesc = getRandomItem(BANNER_THEMES);
  const bannerDescGradient = gradient(bannerDesc.gradient);

  useEffect(() => {
    fetch("/assets/fonts/ansi_shadow.flf")
      .then((res) => res.text())
      .then((font) => {
        figlet.parseFont("ANSI Shadow", font);

        figlet.text(
          "DEVMATCH",
          { font: BANNER_FONTS.ansiShadow },
          async (error, data) => {
            if (error) {
              console.error(
                "An error occurred while creating console banner :",
                error
              );
              return;
            }

            const output = bannerGradient.multiline(data as string);
            const desc = bannerDescGradient.multiline(
              "Tinder for Software Engineers!"
            );
            const sysInfo = systemInfo(nodeVersion);

            console.log(`\n${output}\n${desc}\n\n${sysInfo}\n\n`);
            console.log("");
          }
        );
      })
      .catch((err) => {
        console.error("An error occurred while creating console banner :", err);
      });
  }, []);

  return null;
};

export default ConsoleBanner;
