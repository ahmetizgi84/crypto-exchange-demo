const calculateTotalPrice = (quantity, price) => {
    const totalPrice = quantity * price;

    return isNaN(totalPrice) ? 0 : totalPrice;
}

export default calculateTotalPrice;