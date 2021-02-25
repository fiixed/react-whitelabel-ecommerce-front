import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart }, // this value is an array
    {
      headers: {
        authtoken,
      },
    }
  );
