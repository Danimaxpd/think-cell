const { makeQuery } = require('./functions/makeQuery');

console.info('*** Start ***');

makeQuery('./data/sampleInputSmall.json').then((query) => {
  console.info('*** Testing file sampleInputSmall... ***');
  console.info('Testing query function...');
  console.log(query(3)); // should return 'red'
  console.log(query(-1.5)); // should return 'green'
  console.log(query(10)); // should return 'blue'
  console.log(query(100)); // should return undefined
  console.log(query(-10)); // should return undefined
}).catch(error => {
  console.error('Error sampleInputSmall:', error);
});


const start = Date.now();
makeQuery('./data/sampleInputBig2.json').then((query) => {
  console.info('*** Testing file sampleInputBig2... ***');
  const end = Date.now();
  console.info('Testing query function...');
  console.log('Time to create query function:', end - start, 'ms');
  const queryStart = Date.now();
  console.log(query(-61865984)); // should return e
  console.log(query(98566144)); // should return a
  console.log(query(NaN)); // should return undefined
  const queryEnd = Date.now();
  console.log('Time to query keys:', queryEnd - queryStart, 'ms');
}).catch(error => {
  console.error('Error sampleInputBig2:', error);
});