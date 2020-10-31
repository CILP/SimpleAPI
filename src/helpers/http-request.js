const https = require('https');

const isValidHostname = hostname =>
  /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g
    .test(hostname);

function request(options) {
  if (!options) {
    throw new Error('Options param must be provided');
  }

  if (!('host' in options)) {
    throw new Error('Options.host must be provided');
  }

  if (!isValidHostname(options.host)) {
    throw new Error('Options.host must be a valid hostname');
  }

  if (!('port' in options)) {
    throw new Error('Options.port must be provided');
  }

  if (!('path' in options)) {
    throw new Error('Options.path must be provided');
  }

  if (!('method' in options)) {
    throw new Error('Options.method must be provided');
  }

  return new Promise((resolve, reject) => {

    const chunks = [];

    const req = https.request(options, res => {
      res.on('data', data => {
        chunks.push(data);
      });

      res.on('end', () => {
        resolve(chunks.join(''));
      });
    });

    req.on('error', err => {
      reject(err);
    });

    req.end();
  });
}

module.exports = request;