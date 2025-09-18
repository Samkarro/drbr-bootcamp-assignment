export const dataProvider = {
  login: async (email: string, password: string) => {
    return "test";
  },
  register: async (
    avatar: string | BinaryType,
    email: string,
    password: string,
    password_confirmation: string,
    username: string
  ) => {},
};
