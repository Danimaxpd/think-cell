const fs = require('fs');
const JSONStream = require('JSONStream');

/**
 * Creates a query function from a JSON file containing an array of intervals and their corresponding values.
 * 
 * The JSON file should contain an array of objects, each with a 'key' property (an array of two numbers 
 * representing the start and end of an interval) and a 'val' property (the value corresponding to that interval).
 * 
 * The returned query function takes a number as input and returns the value corresponding to the interval 
 * containing that number. If the number is not contained in any interval, the query function returns undefined.
 * 
 * @param {string} filename - The path to the JSON file to read.
 * 
 * @returns {Promise<Function>} - A promise that resolves to the query function.
 * 
 * @example
 * makeQuery('./data/sampleInput.json').then((query) => {
 *   console.log(query(5));
 *    returns the value corresponding to the interval containing 5
 * }).catch((error) => {
 *   console.error(error);
 * });
 */
function makeQuery(filename) {
  return new Promise((resolve, reject) => {
    const input = [];
    const readStream = fs.createReadStream(filename, { encoding: 'utf8' });
    const parseStream = JSONStream.parse('*');

    console.log('Reading and parsing JSON file...');

    parseStream.on('data', (item) => {
      item.index = input.length;
      input.push(item);
    });

    parseStream.on('error', (error) => {
      console.error('Error while parsing JSON file:', error);
      reject(error);
    });

    parseStream.on('end', () => {
      console.log('JSON file successfully parsed.');
      console.log('Creating query function...');
      // Sort by starting point, but keep original order for overlapping intervals
      input.sort((a, b) => a.key[0] - b.key[0] || a.index - b.index);

      resolve((key) => {
        console.log('Querying key:', key);
        let low = 0;
        let high = input.length - 1;

        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          const [start, end] = input[mid].key;

          if (start <= key && key < end) {
            return input[mid].val;
          }

          if (key < start) {
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        }

        return undefined;
      });

      console.log('Query function created successfully.');
    });

    readStream.pipe(parseStream);
  });
}


module.exports = {
  makeQuery
};