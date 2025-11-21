import figlet from "figlet";
import gradient from "gradient-string";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import boxen from "boxen";

import { errorMessages } from "../config/config.js";

const fonts = {
  big: "Big",
  doom: "Doom",
  standard: "Standard",
  slant: "Slant",
  ghost: "Ghost",
  ansiShadow: "ANSI Shadow",
  epic: "Epic",
  bloody: "Bloody",
  cuberLarge: "Cyberlarge",
};

const themes = [
  {
    name: "Cyber Blue",
    gradient: ["#00eaff", "#0077ff"],
    taglineColor: "#00eaff",
  },
  {
    name: "Neon Purple",
    gradient: ["#9d4edd", "#7b2cbf", "#5a189a"],
    taglineColor: "#9d4edd",
  },
  {
    name: "Sunset Pink-Blue",
    gradient: ["#ff5f8f", "#ff99c8", "#00bbf9", "#00f5d4"],
    taglineColor: "#ff5f8f",
  },
  {
    name: "Retro 80s Neon",
    gradient: ["#ff00ff", "#ff0099", "#00e5ff"],
    taglineColor: "#ff00ff",
  },
  {
    name: "Vercel Monochrome",
    gradient: ["#ffffff", "#8d8d8d", "#333333"],
    taglineColor: "#ffffff",
  },
  {
    name: "Matrix Green",
    gradient: ["#00ff41", "#00b300"],
    taglineColor: "#00ff41",
  },
  {
    name: "Gold Luxury",
    gradient: ["#fff3b0", "#ffd60a", "#fca311", "#e85d04"],
    taglineColor: "#fca311",
  },
  {
    name: "Fire Lava",
    gradient: ["#ff0000", "#ff7b00", "#ffb100"],
    taglineColor: "#ff7b00",
  },
  {
    name: "Ice Blue",
    gradient: ["#caf0f8", "#90e0ef", "#00b4d8", "#0077b6"],
    taglineColor: "#00b4d8",
  },
  {
    name: "DevMatch Teal-Purple (Default)",
    gradient: ["#00f5d4", "#7b2cbf"],
    taglineColor: "#00f5d4",
  },
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const devMatchLogo = `
     /\\_/\\  
    ( o.o )   DEV MATCH
     > ^ < 
`;

const mascotFrames = [
  `
     /\\_/\\  
    ( o.o )   💻   DEVMATCH BOOTING...
     > ^ < 
`,
  `
     /\\_/\\  
    ( o.o )   🔥   ENGAGING SYSTEMS...
     > ^ < 
`,
  `
     /\\_/\\  
    ( o.o )   ⚡   OPTIMIZING MODULES...
     > ^ < 
`,
];

const isRunningWithConcurrently = () => {
  return (
    process.env.CONCURRENTLY === "true" ||
    process.stdout.isTTY === false ||
    process.env.CI === "true"
  );
};

const safeClear = () => {
  if (!isRunningWithConcurrently()) {
    console.clear();
  } else {
    // Just add some spacing instead
    console.log("\n".repeat(2));
  }
};

const typewriter = async (text, color = "#ffffff", delay = 40) => {
  let out = "";
  for (let char of text) {
    out += char;
    process.stdout.write(chalk.hex(color)(char));
    await new Promise((res) => setTimeout(res, delay));
  }
  console.log("\n");
};

const loadingBar = async (label, color = "cyan") => {
  const total = 20;
  for (let i = 0; i <= total; i++) {
    const bar = chalk[color]("█").repeat(i) + chalk.gray("░").repeat(total - i);
    process.stdout.write(
      `\r${label}: [${bar}] ${Math.round((i / total) * 100)}%`
    );
    await new Promise((r) => setTimeout(r, 40));
  }
  console.log("\n");
};

const spinnerFrames = ["⠋", "⠙", "⠸", "⢰", "⣠", "⣀", "⡀", "⠄"];
const spinner = async (label, duration = 800) => {
  const start = Date.now();
  let i = 0;
  while (Date.now() - start < duration) {
    process.stdout.write(
      `\r${spinnerFrames[i++ % spinnerFrames.length]} ${label}`
    );
    await new Promise((r) => setTimeout(r, 60));
  }
  console.log("");
};

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
    const theme = randomItem(themes);
    const gradientFn = gradient(theme.gradient);

    safeClear();
    chalkAnimation.glitch("INITIALIZING DEVMATCH SYSTEM...");
    await new Promise((r) => setTimeout(r, 1800));
    safeClear();

    for (let frame of mascotFrames) {
      safeClear();
      console.log(chalk.cyan(frame));
      await new Promise((r) => setTimeout(r, 550));
    }

    safeClear();

    await new Promise((resolve, reject) => {
      figlet.text("DEVMATCH", { font: fonts.ansiShadow }, async (err, data) => {
        if (err) {
          console.error("Banner Error:", err);
          return;
        }

        console.log(chalk.hex(theme.taglineColor).bold(devMatchLogo));
        console.log("");

        const shimmer = chalkAnimation.neon(gradientFn.multiline(data));
        await new Promise((r) => setTimeout(r, 2000));
        shimmer.stop();

        safeClear();

        await loadingBar("Loading core modules", "cyan");
        console.log("");
        await loadingBar("Activating algorithms", "magenta");
        console.log("");

        safeClear();

        await spinner("Syncing referral engine");
        await spinner("Optimizing AI matches");
        await spinner("Establishing encrypted tunnels");

        console.log("");

        const anim = chalkAnimation.rainbow(
          "🚀  Launching DevMatch Engine...\n"
        );
        await new Promise((r) => setTimeout(r, 1800));
        anim.stop();

        const done = chalkAnimation.rainbow("✔  DevMatch System Online!\n");
        await new Promise((r) => setTimeout(r, 1500));
        done.stop();

        console.log(chalk.greenBright.bold("\nREADY.\n"));

        safeClear();

        const output = gradientFn.multiline(data);
        console.log("\n" + output);
        await typewriter("Tinder for Software Engineers!", theme.taglineColor);

        systemInfo(port);

        resolve();
      });
    });
  } catch (error) {
    console.error(
      `❌ ERROR :: ${errorMessages.BANNER_ERROR} : ${error.message}`
    );
  }
};
