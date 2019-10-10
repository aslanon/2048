/**
 *
 * @param {Array} list
 */
const randomFromList = list => {
  if (list.constructor == Array)
    return list[Math.floor(Math.random() * list.length)];
};

/**
 *
 * @param {Number} max
 */
function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) - min);
}

export { random, randomFromList };
