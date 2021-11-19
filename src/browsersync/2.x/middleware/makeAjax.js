/**
 * mock ajax api
 * @param apiName
 * @param data
 * @param timeout
 * @returns {function(): function(*, *, *): void}
 */
export default ({
  apiName,
  data = null,
  timeout = 200,
}) => () => {
  const apiNameWithBrackets = `[${apiName}]`;

  return (req, res, next) => {
    const remoteAddress = req.headers['x-forwarded-for']
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress;

    // Set Header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');

    if (req.method === 'GET') {
      console.log(
        `${apiNameWithBrackets} Receive a require\n`
        + `${apiNameWithBrackets} -----------------\n`
        + `${apiNameWithBrackets} Method: ${req.method}\n`
        + `${apiNameWithBrackets} RemoteAddress: ${remoteAddress}\n`
        + `${apiNameWithBrackets} Query: ${req.originalUrl.replace(/.+\?/, '')}\n`,
      );

      setTimeout(() => {
        res.end(JSON.stringify(data));
        next();
      }, timeout);
    }

    // Receive the browser data
    req.on('data', (e) => {
      console.log(
        `${apiNameWithBrackets} Receive a require\n`
        + `${apiNameWithBrackets} -----------------\n`
        + `${apiNameWithBrackets} Method: ${req.method}\n`
        + `${apiNameWithBrackets} RemoteAddress: ${remoteAddress}\n`
        + `${apiNameWithBrackets} Data: ${e}\n`,
      );

      setTimeout(() => {
        res.end(JSON.stringify(data));
        next();
      }, timeout);
    });

    req.on('err', (err) => {
      console.log(
        `${apiNameWithBrackets} Error: ${err}\n`,
      );

      res.end(`Error:${err}`);
      next();
    });
  };
};
