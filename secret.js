
const inputJSON1 = `
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}`;

const inputJSON2 = `
{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}`;

function processTestCase(inputJSON) {
    // Parse the input JSON
    const data = JSON.parse(inputJSON);
    const keys = data.keys;
    const n = keys.n;
    const k = keys.k;

    const points = [];


    Object.keys(data).forEach((key) => {
        if (key !== "keys") {
            const x = parseInt(key); 
            const base = parseInt(data[key].base);
            const encodedValue = data[key].value;

            const y = parseInt(encodedValue, base);

            points.push([x, y]);
        }
    });

    const constantTerm = lagrangeInterpolation(points, k);

    return constantTerm;
}


function lagrangeInterpolation(points, k) {
    let result = 0;

    for (let i = 0; i < k; i++) {
        let term = points[i][1];  
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        result += term;
    }

    return result;
}

const constantTerm1 = processTestCase(inputJSON1);
const constantTerm2 = processTestCase(inputJSON2);


console.log("Constant term for Test Case 1 (c1):", constantTerm1);
console.log("Constant term for Test Case 2 (c2):", constantTerm2);
