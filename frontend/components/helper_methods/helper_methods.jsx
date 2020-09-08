export const avgRating = (reviews) => {
  let count = 0
  if (reviews.length) {

    let reduced = reviews.reduce((acc, cur) => {
      if (cur.rating) {
        count++
        return acc + cur.rating
      } else {
        return acc
      }
    }, 0)
    
    return (reduced / count).toFixed(2);
    
  } else {
    return 0
  }
}

export const convertMoment = (startDate, endDate) => {
  if (startDate) {
    const cloneStart = startDate.clone();
    const formatStart = cloneStart.format(`MMM DD`);
    const formatStartMonth = cloneStart.format("MMM");
    const startPlusOne = cloneStart.add(1, 'days').format(`MMM DD`);
    const startPlusOneMonth = cloneStart.add(1, 'days').format(`MMM`);
    const startPlusOneDay = cloneStart.add(1, 'days').format(`DD`);

    if (startDate && !endDate) {

      if (formatStartMonth === startPlusOneMonth) {

        return `${formatStart} - ${startPlusOneDay}`
      } else {

        return `${formatStart} - ${startPlusOne}`
      }
    } else {
      const cloneEnd = endDate.clone();
      const formatEnd = cloneEnd.format(`MMM DD`);
      const formatEndMonth = cloneEnd.format("MMM");
      const formatEndDay = cloneEnd.format("DD")

      if (formatStartMonth === formatEndMonth) {
        return `${formatStart} - ${formatEndDay}`
      } else {
        return `${formatStart} - ${formatEnd}`
      }

    }

  } else if (!startDate && endDate) {
    const cloneEnd = endDate.clone();
    const formatEnd = cloneEnd.format(`MMM DD`);
    const formatEndMonth = cloneEnd.format("MMM");
    const formatEndDay = cloneEnd.format("DD")
    const endMinusOne = cloneEnd.subtract(1, 'days').format(`MMM DD`);
    const endMinusOneMonth = cloneEnd.subtract(1, 'days').format(`MMM`);

    if (formatEndMonth === endMinusOneMonth) {

      return `${endMinusOne} - ${formatEndDay}`
    } else {

      return `${endMinusOne} - ${formatEnd}`
    }
  } else {

    return ``
  } 
}