import Input from "../components/common/input";
import Link from "next/link";
import Joi from "joi-browser";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const schema = {
    password: Joi.string().required().label("Password"),
    email: Joi.string().email().required().label("Email"),
  };

  const validateOnChange = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(account, schema, options);

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    // console.log(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors || {});
    if (newErrors) return;
    console.log("Submitted");
    // router.push({
    //   pathname: "/verify-email",
    //   query: { email: account.email },
    // });
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateOnChange(input);

    if (errorMessage) {
      newErrors[input.name] = errorMessage;
    } else {
      delete newErrors[input.name];
    }

    const newAccount = { ...account };
    newAccount[input.name] = input.value;
    setErrors(newErrors);
    setAccount(newAccount);
  };

  return (
    <div className="bg">
      <NavBar />
      <div className="static flex flex-col bg-tertiary">
        <div className="flex justify-center  h-screen ">
          <div className="flex flex-col gap-4 justify-center my-auto bg-secondary w-4/5 lg:w-6/12 h-auto rounded-xl shadow-2xl animate__animated animate__flipInX">
            <div className="flex flex-col mx-auto mt-5 text-white">
              <h1 className=" mx-auto text-xl lg:text-2xl font-bold ">
                Sign In
              </h1>
              <span className="text-center text-sm lg:text-base">
                Log into your account to continue
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex
      flex-col
      gap-4
      justify-center"
            >
              <div className="flex gap-4 flex-col mx-auto w-11/12 lg:w-3/4">
                <Input
                  value={account.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  error={errors.email}
                />
                <Input
                  value={account.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Password"
                  type="password"
                  error={errors.password}
                />

                <button className="mx-auto active:bg-[#FF8F50] text-white h-12 w-11/12  md:w-[20rem]  rounded-xl text-base hover:bg-[#FF7A30] bg-[#FF6610]">
                  Log in
                </button>
              </div>
              <div className="flex flex-col"></div>
            </form>
            <div className="flex flex-col mx-auto mb-5">
              <span className="text-center text-white text-sm">
                {`Don't have an account?`}
                <Link
                  className="underline underline-offset-2 text-sm"
                  href="/register"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
