const camelizeStr = (str) => str.replace(/(_[a-z])/g, (match) => match[1].toUpperCase());

const camelize = (object) => Object.entries(object).reduce((obj, [key, value]) => ({
  ...obj,
  [camelizeStr(key)]: value,
}), {});

module.exports = camelize;