import * as Yup from "yup";
export const REGISTER_SCHEMA = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(6, "More than 6 chars"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match",
  ),
});

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(6, "More than 6 chars"),
});

export const ADD_PRODUCT = Yup.object().shape({
  title: Yup.string().required("Must be provideded"),
  description: Yup.string().required("Add short description"),
  quantity: Yup.number("Must be number")
    .min(0, "Quantity can't be less than zero")
    .required("Must be provided"),
  sale_price: Yup.number().lessThan(Yup.ref("price")),
  price: Yup.number("Must be nubmer").min(0, "Price can't be less than zero"),
  category: Yup.string().required(
    "Please select a category or create a new one",
  ),
});
