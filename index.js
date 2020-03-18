/**
 * This is the entry point for the CLI tool. All we do is
 * grab Node's filesystem module and pass it through.
 */

const fs = require('fs').promises;
require('./lib/app')({ fs });