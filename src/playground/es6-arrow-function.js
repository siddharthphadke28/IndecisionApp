const fullName = "Siddharth Prasad Phadke";
const getFirstName = (fName) => fName.split(" ")[0];

console.log(getFirstName(fullName));


const multiplier ={
    numbers: [1,2,3,4,5,6],
    multiplyBy: 3,
    multiply(){
        return this.numbers.map((singleNumber) => singleNumber * this.multiplyBy);
    }
};
console.log(multiplier.multiply());