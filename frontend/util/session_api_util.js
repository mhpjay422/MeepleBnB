export const signup = (formData) => {
  return $.ajax({
    method: "POST",
    url: `/api/users`,
    data: formData,
    error: (err) => console.log(err)
  });
};

export const login = (formData) => {
  ;
  return $.ajax({
    method: "POST",
    url: `/api/session`,
    data: formData,
    error: (err) => console.log(err)
  });
};

export const logout = () => {

  return $.ajax({
    method: "DELETE",
    url: `/api/session`,
    error: (err) => console.log(err)
  });
};
