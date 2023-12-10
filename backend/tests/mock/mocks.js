const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const generateDate = () => {
  const data = new Date();
  const formated = data.toISOString().slice(0, 19).replace('T', ' ');
  return formated;
};
const generateDate2 = generateDate();
console.log(generateDate2);

module.exports = { allProducts, generateDate };
