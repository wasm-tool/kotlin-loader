const { execSync } = require('child_process');
const { spawn } = require('child_process');
const { readFileSync } = require('fs');
const { join, dirname } = require('path');

function spawnKonanc({ isDebug, cwd }) {
  console.log("🚍  Starting to compile");
  const bin = 'konanc';

  const args = [
    '-target',
    'wasm32',
    cwd,
    '-o',
    'dist/program'
  ];

  const options = {
    cwd,
    env: {
      PATH: process.env['PATH']
    }
  };

  return new Promise((resolve, reject) => {
    const p = spawn(bin, args, options);

    console.log("⚙️  Compiling");

    let stdout = '';
    let stderr = '';

    p.stdout.on('data', (d) => {
      stdout += d;
    });

    p.stderr.on('data', (d) => {
      stderr += d;
    });

    p.on('close', (code) => {
      if (code === 0) {
        console.log("✅  Compiled");
        resolve();
      } else {
        reject(stderr);
      }
    });
  });
}

module.exports = function() {
  this.cacheable();
  const callback = this.async();

  const cwd = dirname(this.resourcePath);

  spawnKonanc({
    isDebug: this.debug,
    cwd
  }).then(() => {
      callback(null, "");
    })
    .catch(callback);
}

module.exports.raw = true;
