const { verifyDownloadTasks } = require("cy-verify-downloads");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on("task", verifyDownloadTasks);
        },
        video: false,
    },
});
