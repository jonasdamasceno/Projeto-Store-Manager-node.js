const generateDate = () => {
  const data = new Date();
  const formated = data.toISOString().slice(0, 19).replace('T', ' ');
  return formated;
};
const generateDate2 = generateDate();
console.log(generateDate2);

module.exports = generateDate;