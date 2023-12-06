var numbers = "01234567abc";
var strings = "abcccccdsfadsfasd";
// Kiểm tra xem thử chuỗi này có phải toàn bộ là số hay không.

// -- Cách 1: /<pattern>/flags
var regexIsOnlyNumber = /^[0-9]+$/m;
var regexIsOnlyString = /^[A-Za-z]+$/;

// -- Cách 2: new RegExp(pattern, flags)
var regexIsOnlyNumber = new RegExp("^[0-9]+$", "m");

// ----------------------------------------------------------
// Kiểm tra coi thử thỏa mãn regex hay không: thỏa mãn - true
var isOnlyNumber = regexIsOnlyNumber.test(numbers);

console.log("isOnlyNumber", isOnlyNumber);
console.log("regexIsOnlyString", regexIsOnlyString.test(strings));
