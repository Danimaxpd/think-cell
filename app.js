const { makeQuery } = require('./functions/makeQuery');

console.info('Testing file sampleInputSmall...');
makeQuery('./data/sampleInputSmall.json').then((query) => {
  console.info('Testing query function...');
  console.info('Query result for key 3:', query(3)); // returns 'red'
}).catch(error => {
  console.error('Error sampleInputSmall:', error);
});

console.info('Testing file sampleInputBig2...');
makeQuery('./data/sampleInputBig2.json').then((query) => {
  console.info('Testing query function...');
  console.info('Query result for key 10:', query(3));
}).catch(error => {
  console.error('Error sampleInputBig2:', error);
});