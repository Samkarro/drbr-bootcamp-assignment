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
          localStorage.setItem("redseam-username", data.user.username);
          localStorage.setItem("redseam-email", data.user.email);
          if (data.user.avatar) {
            localStorage.setItem("redseam-pfp", data.user.avatar);
          } else {
            localStorage.setItem("redseam-pfp", "");
          }
          localStorage.setItem("redseam-token", data.token);
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
    avatar: File | null,
    email: string,
    password: string,
    password_confirmation: string,
    username: string
  ) => {
    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("username", username);

    const response = await fetch(
      "https://api.redseam.redberryinternship.ge/api/register",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.user && !data.errors) {
          localStorage.setItem("redseam-username", data.user.username);
          localStorage.setItem("redseam-email", data.user.email);
          if (data.user.avatar) {
            localStorage.setItem("redseam-pfp", data.user.avatar);
          } else {
            localStorage.setItem("redseam-pfp", "");
          }
          localStorage.setItem("redseam-token", data.token);
          redirect("/products");
        } else if (data.errors) {
          throw Error(JSON.stringify(data.errors));
        } else {
          throw Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getProducts: async (
    page: number,
    from?: number,
    to?: number,
    sort?: string
  ) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    if (from !== undefined)
      params.append("filter[price_from]", from.toString());
    if (to !== undefined) params.append("filter[price_to]", to.toString());
    if (sort) params.append("sort", sort);

    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/products?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err.message);
      });

    return response;
  },

  getProduct: async (id: string) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/products/${id}`,
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
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });
    return response;
  },

  getCart: async (token: string | null) => {
    try {
      const res = await fetch(
        "https://api.redseam.redberryinternship.ge/api/cart",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  addToCart: async (
    product: number,
    color: string,
    quantity: number | null,
    size: string | null,
    token: string | null
  ) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${product}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          color,
          size,
          quantity,
        }),
      }
    ).catch((err) => {
      console.log(err);
    });
  },

  removeFromCart: async (product: number, token: string | null) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${product}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch((err) => {
      console.log(err);
    });
  },

  updateCart: async (
    productId: number,
    quantity: number,
    token: string | null
  ) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );

    return response.json();
  },

  pay: async (
    name: string,
    surname: string,
    email: string,
    address: string,
    zip_code: string,
    token: string | null
  ) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/cart/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          address,
          zip_code,
        }),
      }
    ).catch((err) => {
      console.log(err);
    });
  },
};
