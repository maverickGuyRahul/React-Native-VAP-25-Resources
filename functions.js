// function add(a, b) {
//   return a + b;
// }

// add(3, 5);

// console.log(add(4, 8));

const degreeToFahrenheit = (degreeCelcius) => {
  let fahrenheit = (degreeCelcius * 9) / 5 + 32;
  return fahrenheit;
};

console.log(
  'The temperature in degrees fahrenheit is : ' + degreeToFahrenheit(35)
);
