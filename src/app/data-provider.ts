import { unauthorized } from "next/navigation";

export const dataProvider = {
  login: async (email: string, password: string) => {
    const formData = JSON.stringify({ email, password });

    const response = await fetch(
      "https://api.redseam.redberryinternship.ge/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: formData,
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.user) {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.username);
          localStorage.setItem("token", data.token);
        } else if (data.errors) {
          throw Error(data.errors);
        } else {
          throw Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  register: async (
    avatar: string | null | BinaryType,
    email: string,
    password: string,
    password_confirmation: string,
    username: string
  ) => {
    const formData = JSON.stringify({
      avatar,
      email,
      password,
      password_confirmation,
      username,
    });
    console.log(formData);

    const response = await fetch(
      "https://api.redseam.redberryinternship.ge/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: formData,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.username);
          localStorage.setItem("token", data.token);
        } else if (data.errors) {
          throw Error(data.errors);
        } else {
          throw Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
