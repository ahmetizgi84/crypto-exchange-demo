
import _ from 'lodash'

function processData(list, desc) {
    let res = []

    // order list just in case
    list = _.orderBy(list, ['price'], ["asc"]);

    // Calculate cummulative volume
    if (desc) { // azalan
        for (var i = list.length - 1; i >= 0; i--) {
            if (i < (list.length - 1)) {
                list[i].quantity = list[i + 1].quantity + list[i].quantity;
            }
            else {
                //list[i].quantity = list[i].quantity;
            }
            var dp = {};
            dp["price"] = list[i].price;
            dp["quantity"] = list[i].quantity;
            res.unshift(dp);
        }
    }
    else { // artan
        for (let idx = 0; idx < list.length; idx++) {
            if (idx > 0) {
                list[idx].quantity = list[idx - 1].quantity + list[idx].quantity;
            }
            else {
                //list[idx].quantity = list[idx].quantity;
            }
            let dp = {};
            dp["price"] = list[idx].price;
            dp["quantity"] = list[idx].quantity;
            res.push(dp);
        }
    }

    let arrayFormat = []
    res?.map(item => {
        let temp = []
        temp[0] = item.price
        temp[1] = item.quantity
        arrayFormat.push(temp)
        return "test"
    })

    return arrayFormat
}

export default processData