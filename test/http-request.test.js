const request = require('../src/helpers/http-request');

describe('Https Request Helper', () => {

  test('GET with missing options', () => {
    expect(() => {
      request();
    }).toThrow('Options param must be provided');
  });

  test('GET with empty options', () => {
    expect(() => {
      request({});
    }).toThrow('Options.host must be provided');
  });

  test('GET with invalid host', () => {
    expect(() => {
      request({ host: '!asas.com' });
    }).toThrow('Options.host must be a valid hostname');
  });

  test('GET with missing port', () => {
    expect(() => {
      request({
        host: 'test.com'
      });
    }).toThrow('Options.port must be provided');
  });

  test('GET with missing path', () => {
    expect(() => {
      request({
        host: 'test.com',
        port: 443
      });
    }).toThrow('Options.path must be provided');
  });

  test('GET with missing method', () => {
    expect(() => {
      request({
        host: 'test.com',
        port: 443,
        path: ''
      });
    }).toThrow('Options.method must be provided');
  });

  test('GET with invalid connection', async () => {
    return await expect(
      request({
        host: 'localhost',
        port: 443,
        path: '',
        method: ''
      })
    ).rejects.toThrow('connect ECONNREFUSED 127.0.0.1:443');
  });

  test('GET with valid options', async () => {
    return await expect(
      request({
        host: 'google.com',
        port: 443,
        path: '',
        method: 'GET'
      })
    ).resolves;
  })
});
