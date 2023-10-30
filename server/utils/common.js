function generateCode(noOfDigits) {

    const codeArray = [];

    for (let i = 0; i < noOfDigits; i++) {

        codeArray.push(Math.floor(Math.random() * 10));

    }

    return codeArray.join("");

}

module.exports = {

    generateCode,

}