/**
 * This is the entry point for the CLI tool. All we do is
 * grab Node's filesystem module and pass it through, and
 * handle an overall application error.
 */

const fs = require('fs').promises;

require('./lib/app')({ fs })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
