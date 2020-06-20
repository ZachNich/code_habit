const problem1 = testFunction => {
    return testFunction(10) === 23 && testFunction(100) === 2318 && testFunction(999) === 232169 && testFunction(0) === 0 && testFunction (15) === 45
}

const problem2 = testFunction => {
    return testFunction('abba', ['aabb', 'abcd', 'bbaa', 'dada']) === ['aabb', 'bbaa'] && testFunction('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) === ['carer', 'racer'] && testFunction('laser', ['lacer', 'lazing', 'lazy']) === []
}

const problem3 = testFunction => {
    return testFunction(0) === false && testFunction(1) === false && testFunction(2) === true && testFunction(73) === true && testFunction(75) === false && testFunction(-1) === false
}

const problem4 = testFunction => {
    return testFunction('') === 0 && testFunction('abcde') === 0 && testFunction('aabbcde') === 2 && testFunction('aabBcde') === 2 && testFunction('Indivisibility') === 1 && ('Indivisibilities') === 2
}

const problem5 = testFunction => {
    return testFunction([1,2,0,1,0,1,0,3,0,1]) === [1,2,1,1,3,1,0,0,0,0] && testFunction([9,0,0,9,1,2,0,1,0,1,0,3,0,1,9,0,0,0,0,9]) === [9,9,1,2,1,1,3,1,9,9,0,0,0,0,0,0,0,0,0,0] && testFunction(['a',0,0,'b','c','d',0,1,0,1,0,3,0,1,9,0,0,0,0,9]) === ["a","b","c","d",1,1,3,1,9,9,0,0,0,0,0,0,0,0,0,0] && testFunction(['a',0,0,'b',null,'c','d',0,1,false,0,1,0,3,[],0,1,9,0,0,{},0,0,9])
}

const problem6 = testFunction => {
    return testFunction('') === {} && testFunction('aa') === {'a': 2} && testFunction('aabb') === {'a': 2, 'b': 2} && testFunction('abcaba') === {'a': 3, 'b': 2, 'c': 1}
}

const problem7 = testFunction => {
    return testFunction([ 0, 1, 0 ]) === 1 && testFunction([ 1, 1, 1, 2, 1, 1]) === 2 && testFunction([ 3, 10, 3, 3, 3 ]) === 10
}

const problem8 = testFunction => {
    return testFunction('The sunset sets at twelve o\' clock.') === '20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11' && testFunction('The narwhal bacons at midnight.') === '20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20'
}

const problem9 = testFunction => {
    return testFunction([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) === '(123) 456-7890' && testFunction([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]) === '(111) 111-1111' && testFunction([3, 3, 6, 3, 2, 0, 7, 5, 0, 5]) === '(336) 320-7505'
}

const problem10 = testFunction => {
    return testFunction('#FF9933') === { r: 255, g: 153, b: 51 } && testFunction('#beaded') === { r: 190, g: 173, b: 237 } && testFunction('#000000') === { r: 0, g: 0, b: 0 } && testFunction('#111111') === { r: 17, g: 17, b: 17 } && testFunction('#Fa3456') === { r: 250, g: 52, b: 86 }
}

export default { problem1, problem2, problem3, problem4, problem5, problem6, problem7, problem8, problem9, problem10 }