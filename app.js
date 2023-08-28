const logger = require('pino')()
const { makeQuery } = require('./functions/makeQuery');

logger.info('*** Start ***');

makeQuery('./data/sampleInputSmall.json').then((query) => {
  logger.info('****** Testing file sampleInputSmall ******');
  logger.info('Testing query function...');
  console.debug("- should return 'red': query(3) ->", query(3)); // should return 'red'
  console.debug("- should return 'gree': query(-1.5) ->", query(-1.5)); // should return 'green'
  console.debug("- should return 'blue': query(10) ->", query(10)); // should return 'blue'
  console.debug("- should return undefined: query(100) ->", query(100)); // should return undefined
  console.debug("- should return undefined: query(-10) ->", query(-10)); // should return undefined
}).catch(error => {
  logger.error('Error sampleInputSmall:', error);
});


const start = Date.now();
makeQuery('./data/sampleInputBig2.json').then((query) => {
  const end = Date.now();
  logger.info('****** Testing file sampleInputBig2 ******');
  const dateResult = end - start;
  logger.info('Testing query function...');
  logger.info(`Time to create query function: %d ms`, dateResult);
  const queryStart = Date.now();
  console.debug("- should return 'e': query(-61865984) ->", query(-61865984)); // should return e
  console.debug("- should return 'a': query(98566144) ->", query(98566144)); // should return a
  console.debug("- should return 'undefined': query(NaN) ->", query(NaN)); // should return undefined
  const queryEnd = Date.now();
  const dateEndResult = queryEnd - queryStart;
  logger.info('Time to query keys: %d ms', dateEndResult);
}).catch(error => {
  logger.error(`Error sampleInputBig2:${error}`);
});