module.exports = {
  apps: [
    {
      name: "visualcortex",

      cwd: "/home/ubuntu/devmatch/devmatch-visualcortex",

      script: "npm",

      args: "start",

      env: {
        NODE_ENV: "production",
        PORT: 1997,
      },

      autorestart: true,

      watch: false,

      max_memory_restart: "1G",

      time: true,
    },

    {
      name: "brainbox",

      cwd: "/home/ubuntu/devmatch/devmatch-brainbox",

      script: "npm",

      args: "start",

      env: {
        NODE_ENV: "production",
        PORT: 1995,
      },

      autorestart: true,

      watch: false,

      max_memory_restart: "1G",

      time: true,
    },
  ],
};
