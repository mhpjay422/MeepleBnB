export const fetchReviews = listingId => 
  $.ajax({
    url: `api/listings/${listingId}/reviews`,
    method: "get"
  });


// export const updateReview = id =>
//   $.ajax({
//     url: `api/reviews/${id}`,
//     method: "patch"
//   });

// export const createReview = review => {
//   return $.ajax({
//     url: `api/listings/${listingId}/reviews`,
//     method: "post",
//     data: {
//       review
//     }
//   });
// };

// export const deleteReview = (listingId, id) =>
//   $.ajax({
//     url: `api/listings/${listingId}/reviews/${id}`,
//     method: "delete"
//   });