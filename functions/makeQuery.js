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
 *   returns the value corresponding to the interval containing 5
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
      const index = binarySearch(input, item.key[0]);
      input.splice(index, 0, item);
    });

    parseStream.on('error', (error) => {
      console.error('Error while parsing JSON file:', error);
      reject(error);
    });

    parseStream.on('end', () => {
      console.log('JSON file successfully parsed.');
      console.log('Creating query function...');

      // Sort by starting point, but keep original order for overlapping intervals
      input.sort((a, b) => a.key[0] - b.key[0] || a.key[1] - b.key[1]);

      resolve((key) => {
        for (const item of input) {
          const [start, end] = item.key;
          if (start <= key && key < end) {
            return item.val;
          }
          if (start > key) {
            break;
          }
        }
        return undefined;
      });


      console.log('Query function created successfully.');
    });

    readStream.pipe(parseStream);
  });
}

/**
 * Performs a binary search on a sorted array of intervals to find the index of the interval containing a given key.
 * 
 * @param {Array} arr - The array of intervals to search. Each interval is an object with a 'key' property, 
 *                      which is an array of two numbers representing the start and end of the interval.
 * @param {number} key - The key to search for.
 * 
 * @returns {number} - The index of the interval containing the key, or the index where the key should be inserted 
 *                     if it is not found. If the array is empty, 0 is returned.
 * 
 * @example
 * const arr = [{key: [1, 4], val: 'red'}, {key: [4, 7], val: 'green'}, {key: [7, 10], val: 'blue'}];
 * binarySearch(arr, 5);
 * returns 1
 */
function binarySearch(arr, key) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const interval = arr[mid]?.key;

    if (interval) {
      if (interval[0] <= key && key < interval[1]) {
        return mid;
      }

      if (key < interval[0]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      return mid;
    }
  }

  return low;
}

module.exports = {
  makeQuery,
  binarySearch
};