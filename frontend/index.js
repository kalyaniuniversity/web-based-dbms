function clickMe() {
    console.log("I was clicked!");
}

function add() {

    let num1 = +document.getElementById('num1').value;
    let num2 = +document.getElementById('num2').value;
    let sum = num1 + num2;

    let sumResult = document.getElementById('sumResult');

    console.log(sumResult);

    sumResult.innerHTML = sum;

    // document.getElementById('sumResult').innerHTML = sum;

    console.log(sum);
    // alert('The sum is: ' + sum);
}