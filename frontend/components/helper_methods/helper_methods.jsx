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
    const formatStart = startDate.clone().format(`MMM DD`);
    const formatStartMonth = startDate.clone().format("MMM");
    const startPlusOne = startDate.clone().add(2, 'days').format(`MMM DD`);
    const startPlusOneMonth = startDate.clone().add(2, 'days').format(`MMM`);
    const startPlusOneDay = startDate.clone().add(2, 'days').format(`DD`);

    if (startDate && !endDate) {

      if (formatStartMonth === startPlusOneMonth) {

        return `${formatStart} - ${startPlusOneDay}`
      } else {

        return `${formatStart} - ${startPlusOne}`
      }
    } else {
      const formatEnd = endDate.clone().format(`MMM DD`);
      const formatEndMonth = endDate.clone().format("MMM");
      const formatEndDay = endDate.clone().format("DD")

      if (formatStartMonth === formatEndMonth) {
        return `${formatStart} - ${formatEndDay}`
      } else {
        return `${formatStart} - ${formatEnd}`
      }

    }

  } else if (!startDate && endDate) {
    const formatEnd = endDate.clone().format(`MMM DD`);
    const formatEndMonth = endDate.clone().format("MMM");
    const formatEndDay = endDate.clone().format("DD")
    const endMinusOne = endDate.clone().subtract(2, 'days').format(`MMM DD`);
    const endMinusOneMonth = endDate.clone().subtract(2, 'days').format(`MMM`);

    if (formatEndMonth === endMinusOneMonth) {

      return `${endMinusOne} - ${formatEndDay}`
    } else {

      return `${endMinusOne} - ${formatEnd}`
    }
  } else {

    return ``
  } 
}