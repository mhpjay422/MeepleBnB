export const fetchListings = filters => {
  debugger
  return $.ajax({
    url: '/api/listings',
    method: 'get',
    data: filters
  });
};

export const fetchListing = id => {
  return $.ajax({
    url: `/api/listings/${id}`,
    method: 'get',
    error: (err) => console.log(err)
  });
};

export const createListing = form => {
  return $.ajax({
    url: '/api/listings',
    method: 'post',
    data: form,
    error: (err) => console.log(err)
  });
};
