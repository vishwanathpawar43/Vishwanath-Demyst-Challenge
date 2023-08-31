import startServer from "./app";

async function init() {
  try {
    console.log(`Starting server ... `);
    await startServer();
  } catch (err) {
    console.error(`Error starting the server: ${err}`);
    process.exit(1);
  }
}

init();
