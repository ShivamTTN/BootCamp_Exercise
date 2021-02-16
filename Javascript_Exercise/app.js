function prompt_func() {
    var amt = prompt('Please Enter Amount.');
    var interest_rate = prompt('Please Enter Interest Rate.');
    var no_of_years = prompt('Please Enter Years.');

    var SI = amt * interest_rate * no_of_years / 100;
    alert("Simple Interest : " + SI);
}


//prompt_func();



function is_palindrome() {
    var str = prompt('Please Enter The String');
    var j = str.length - 1;
    for (i = 0; i < Math.floor(str.length) - 1; i++) {
        if (str[i] != str[j]) {
            alert("Not Palindrome");
            return;
        }
        j--;
    }
    alert("Palindrome")
}
//is_palindrome();

function area_of_circle(r) {
    var PI = 3.14;
    var area = PI * r * r;
    alert("Area of Circle :" + area);
}
//area_of_circle(10);

/*common way*/
function copy(mainObj) {
    var objCopy = {};
    var key;

    for (key in mainObj) {
        objCopy[key] = mainObj[key];
    }
    return objCopy;
}

const mainObj = {
    a: 2,
    b: 5,
    c: {
        x: 7,
        y: 4,
    },
}

console.log(copy(mainObj));

/*shallow copy*/
var obj = {
    a: 1,
    b: 2,
};
var objCopy = Object.assign({}, obj);
console.log(objCopy);

/* Deep copy*/
var obj = {
    a: 1,
    b: {
        c: 2,
    },
}

var newObj = JSON.parse(JSON.stringify(obj));

obj.b.c = 20;
console.log(obj);
console.log(newObj);


var obj = 
    [{ "name": "shivam", "age": 20, "salary": 40000, "dob": "12-12-2010" },
        { "name": "aashish", "age": 23, "salary": 20000, "dob": "12-10-2000" },
        { "name": "shivender", "age": 40, "salary": 10000, "dob": "12-7-1994" },
        { "name": "vasu", "age": 10, "salary": 50000, "dob": "17-1-1992" },
        { "name": "vibhor", "age": 26, "salary": 60000, "dob": "21-12-1998" }];

        /*function groupByAge(empArray = []) {
            const groupedEmp = {}
            empArray.forEach(emp => {
                if (groupedEmp[emp.age]) {
                    groupedEmp[emp.age].push(emp)
                } else {
                    groupedEmp[emp.age] = [emp]
                }
            })
        
            return groupedEmp;
        }*/