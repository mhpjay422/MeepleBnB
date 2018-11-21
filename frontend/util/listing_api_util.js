export const fetchListings = () => (
  $.ajax({
    url: '/api/listings',
    method: 'get',
  })
);

export const fetchListing = id => (
  $.ajax({
    url: `/api/listings/${id}`,
    method: 'get',
    error: (err) => console.log(err)
  })
);

export const createListing = form => (
  $.ajax({
    url: '/api/listings',
    method: 'post',
    data: form,
    error: (err) => console.log(err)
  })
);
