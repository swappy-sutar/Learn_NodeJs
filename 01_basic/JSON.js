
// 1.
const data = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "hobbies": ["reading", "swimming", "cycling"],
}
// console.log("data", data);

// 2.
const convert = JSON.stringify(data);
console.log("convert OBJ to json", convert);

// 3.
const jsonObject = '{"name": "John","age": 30, "city": "New York"}';
const dataObject = JSON.parse(jsonObject);


export default { data, dataObject };