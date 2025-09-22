import { redirect, unauthorized } from "next/navigation";

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
        if (data.user && !data.errors) {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.username);
          localStorage.setItem("token", data.token);
          redirect("/products");
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
        if (data.user && !data.errors) {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.username);
          localStorage.setItem("token", data.token);
          redirect("/products");
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

  getProducts: async (page: number, from: number, to: number, sort: string) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/products?page=${page}&filter%5Bprice_from%5D=${from}&filter%5Bprice_to%5D=${to}&sort=${sort}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
