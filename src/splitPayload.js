/**
 *
 * @param {object} input - The object to inspect; the only required param
 * @param {string?} prefix - The current object path being inspected
 * @param {array?} list - The accumulator, a list of properties and keys discovered
 * @returns array list
 *
 * Thank you Tyler L, Brad B, and Tony S for helping me out here!
 */
 const listKeys = (input, prefix, list) => {
  prefix = prefix || '';
  list = list || [];

  // Surprise: `null` is a value in a lot of these payloads but it is also an
  // object, which triggered recursion below. Bail out on any falsey input.
  if (!input) {
    return list;
  }

  // Run all of input's own enumerable property names
  Object.keys(input).forEach(key => {
    // In object notation, record where we are plus this key's name.
    let keyPath = prefix ? prefix + "." + key : key;

    // @TODO: Should this check for key or keyPath?
    if (list.indexOf(key) === -1) {
      list.push(keyPath);
    }

    // Inspect the contents of this item, if applicable
    if (["object", "array"].indexOf(typeof input[key]) !== -1) {
      listKeys(input[key], keyPath, list);
    }
  });
  return list;
}

const splitPayload = (input) => {
  try {
    JSON.parse(input);
  } catch (e) {
    return false;
  }

  return listKeys(JSON.parse(input)).sort();
}

export default splitPayload;
