export const dataProvider = {
  login: async (email: string, password: string) => {
    return "test";
  },
  register: async (
    avatar: string | null | BinaryType,
    email: string,
    password: string,
    password_confirmation: string,
    username: string
  ) => {
    const formData = {
      avatar,
      email,
      password,
      password_confirmation,
      username,
    };
    console.log(formData);
  },
};
