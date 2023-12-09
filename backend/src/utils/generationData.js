const generateDate = () => {
  const data = new Date();
  const formated = data.toISOString().slice(0, 19).replace('T', ' ');
  return formated;
};

module.exports = generateDate;