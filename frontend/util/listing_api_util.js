
export const fetchListings = () => (
  $.ajax({
    url: '/api/listings',
    method: 'GET',
  })
);

export const fetchListing = id => (
  $.ajax({
    url: `/api/listings/${id}`,
    method: 'GET',
    error: (err) => console.log(err)
  })
);

export const createListing = form => (
  $.ajax({
    url: '/api/listings',
    method: 'POST',
    data: form,
    error: (err) => console.log(err)
  })
);
