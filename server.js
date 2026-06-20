/**
 * Phusion Passenger entry point for running this Next.js app on cPanel / CloudLinux
 * ("Setup Node.js App" → Application startup file: server.js).
 *
 * Requirements: run `npm install` (incl. dev deps) and `npm run build` first, so
 * the production .next output exists. Passenger intercepts .listen() and binds the
 * app to the correct socket automatically.
 */
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000, () => {
      console.log("✓ Pars Energy (Next.js) is running");
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js:", err);
    process.exit(1);
  });
