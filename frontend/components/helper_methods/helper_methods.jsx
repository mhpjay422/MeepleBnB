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

// export const convertMoment = (startDate, endDate) => {
//   return 
// }