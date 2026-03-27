module.exports = {
  apps: [
    {
      name: "nourished-ruchika",
      script: ".next/standalone/server.js",
      cwd: "/home/<your-user>/apps/nourished-ruchika",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      max_memory_restart: "400M",
      autorestart: true,
      watch: false,
    },
  ],
};
