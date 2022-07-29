export const formSubmit = (e) => {
  e.preventDefault();
  const [firstValue, secondValue] = e.target.querySelectorAll('input');

  const timeConcentrating = firstValue.value;
  const breakTime = secondValue.value;

  console.log(timeConcentrating, breakTime);
};
