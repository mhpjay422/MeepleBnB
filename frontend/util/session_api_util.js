export const signup = (formData) => {
  return $.ajax({
    url: `/api/users`,
    method: `post`,
    data: formData
  });
};

export const login = (formData) => {
  return $.ajax({
    url: `/api/session`,
    method: `POST`,
    data: formData
  });
};

export const logout = () => {
  return $.ajax({
    url: `/api/session`,
    method: `delete`
  });
};
