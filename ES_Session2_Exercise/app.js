import {circleArea,rectArea,cylinArea} from './exportAreas.js';
import {uniqArr} from './uniqueArrEle.js'
let arr = [1,2,3,4,4,4,7,7,7];
uniqArr(arr);

// console.log("Circle Area :" + circleArea(5));
// console.log("Rectangle Area :" + rectArea(5,10));
// console.log("Cylinder Area :" + cylinArea(10,2));



const str = 'abc';
const allCombinations = (str1) => {
    
   const arr = [];
   for (let x = 0, y=1; x < str1.length; x++,y++) {
      arr[x]=str1.substring(x, y);
   };
   const mp = new Map();
   let temp= "";
   let len = Math.pow(2, arr.length);
   for (let i = 0; i < len ; i++){
      temp= "";
      for (let j=0;j<arr.length;j++) {
         if ((i & Math.pow(2,j))){
            temp += arr[j];
         }
      };
      if (temp !== ""){
           mp.set(i,temp);
      }
   }
   return mp;
};
console.log(allCombinations(str));

function flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

var myMap = new Map();
//adding value in map
//SET
myMap.set(1,'shivam');
myMap.set(2,'tarun');
myMap.set(3,'abhiman');
myMap.set(4,'vasu');
myMap.set(5,'pasha');
console.log(myMap);

//GET
console.log(myMap.get(1));

//HAS
console.log(myMap.has(6));
console.log(myMap.has(1));

//DELETE
myMap.delete(2);
console.log(myMap);

//SIZE
console.log(myMap.size);

//GET KEYS
console.log(myMap.keys());

//GET VALUES
console.log(myMap.values());

//CLEAR
console.log(myMap.clear());
console.log(myMap);


console.log(flatten([[0, 1], [2, 3], [4, 5, [6, 7, [8, [9, 10]]]]]));

//SET
var mySet = new Set();

//adding values in set
mySet.add(20);
mySet.add(40);
mySet.add(60);
mySet.add(80);
mySet.add(100);
console.log(mySet);

//delete
mySet.delete(40);

//Has
console.log(mySet.has(40));
console.log(mySet.has(60));

//Size
console.log(mySet.size);

//Clear
mySet.clear();
console.log(mySet);
