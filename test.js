const array = [1,2,3,4,5]

const reverseArray = (arr) => {

    let reserve = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reserve.push(arr[i]);
    }

    return reserve;
}

console.log(reverseArray(array));