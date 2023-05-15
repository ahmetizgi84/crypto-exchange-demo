const getHumanDate = (date) => {
    let fullDate = new Date(date);

    return fullDate.toLocaleString();
};

export default getHumanDate;