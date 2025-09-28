import { redirect, unauthorized } from "next/navigation";

export const dataProvider = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(
        "https://api.redseam.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem("redseam-username", data.user.username);
        localStorage.setItem("redseam-email", data.user.email);
        localStorage.setItem("redseam-pfp", data.user.avatar || "");
        localStorage.setItem("redseam-token", data.token);

        return { success: true, data };
      } else {
        return { success: false, data };
      }
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  },

  register: async (
    avatar: File | null,
    email: string,
    password: string,
    password_confirmation: string,
    username: string
  ) => {
    try {
      const formData = new FormData();

      if (avatar) formData.append("avatar", avatar);
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
      );

      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem("redseam-username", data.user.username);
        localStorage.setItem("redseam-email", data.user.email);
        localStorage.setItem("redseam-pfp", data.user.avatar || "");
        localStorage.setItem("redseam-token", data.token);

        return { success: true, data };
      } else {
        return { success: false, data };
      }
    } catch (err: any) {
      let newErrorMessage = err.message + " Check if photo is over 1mb.";
      return { success: false, error: newErrorMessage };
    }
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

  removeFromCart: async (
    productId: number,
    color: string,
    size: string,
    token: string | null
  ) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ color, size }), // 👈 send color & size
      }
    ).catch((err) => {
      console.log(err);
    });

    return response?.ok;
  },

  updateCart: async (
    productId: number,
    quantity: number,
    color: string,
    size: string,
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
        body: JSON.stringify({ quantity, color, size }),
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
    try {
      if (!token) throw new Error("User not authenticated");

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
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        console.log(data.errors);
        return { success: false, data };
      }
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  },
};
