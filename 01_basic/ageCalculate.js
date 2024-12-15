console.log("this is the simple age calculator ");

const ageCal = (birthYear) => {
  let currectDate = new Date().getFullYear();
  let age = currectDate - birthYear;
  console.log("your age is: ", age);

  return age;
};

export default { ageCal };
