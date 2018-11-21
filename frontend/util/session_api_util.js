export const signup = (formData) => {
  return $.ajax({
    url: `/api/users`,
    method: `post`,
    data: formData,
    error: (err) => console.log(err)
  });
};

export const login = (formData) => {
  return $.ajax({
    url: `/api/session`,
    method: `post`,
    data: formData,
    error: (err) => console.log(err)
  });
};

export const logout = () => {
  return $.ajax({
    url: `/api/session`,
    method: `delete`,
    error: (err) => console.log(err)
  });
};
