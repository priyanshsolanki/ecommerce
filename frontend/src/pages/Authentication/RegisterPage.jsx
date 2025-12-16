import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userpool from "../../aws/cognitoConfig";
import { toast } from "react-toastify";
import { Roles } from "../../constants/AccessConstants";
import { storeUserDetailsInDynamoDB } from "../../api/authService";
import { User, ShoppingBag, Mail, Lock, Phone, MapPin } from "lucide-react";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    )
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[1-9][0-9]*$/, "Phone must be a positive number"),
  address: Yup.string()
    .min(2, "Address must be at least 2 characters")
    .required("Address is required"),
});

export const Register = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  };

  useEffect(() => {
    if (
      type !== Roles.USER.toLowerCase() &&
      type !== Roles.ADMIN.toLowerCase()
    )
      navigate("/unauthorized");
  }, [type]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const attributeList = [];

      attributeList.push(
        new CognitoUserAttribute({
          Name: "email",
          Value: values.email,
        }),
        new CognitoUserAttribute({
          Name: "custom:role",
          Value: type,
        }),
        new CognitoUserAttribute({
          Name: "name",
          Value: values.name,
        })
      );

      const username = values.email;

      userpool.signUp(
        username,
        values.password,
        attributeList,
        null,
        async (err, data) => {
          if (err) {
            toast.error("Registration Failed.", {
              position: "top-right",
              theme: "dark",
            });
            setSubmitting(false);
          } else {
            toast.success("Registration Successful! Check your email.", {
              position: "top-right",
              theme: "dark",
            });

            await storeUserDetailsInDynamoDB({
              email: values.email,
              name: values.name,
              type,
              address: values.address,
              phone: values.phone.toString(),
              role: type === Roles.ADMIN ? "1" : "0",
            });
            navigate("/verify", { state: { username: values.email } });
            setSubmitting(false);
          }
        }
      );
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const getTitle = () => {
    return type === Roles.USER.toLowerCase()
      ? "Create Your Account"
      : "Admin Registration";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="text-center text-white relative z-10">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8 inline-block">
              <ShoppingBag className="w-20 h-20 text-white" />
            </div>
            <h2 className="text-5xl font-bold mb-6">Join ShopFest</h2>
            <p className="text-xl text-blue-100 max-w-md mx-auto leading-relaxed">
              Create your account and get access to exclusive deals, fast shipping, and amazing products.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-block mb-4">
                <ShoppingBag className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {getTitle()}
              </h1>
              <p className="text-gray-600 text-lg">Start your shopping journey today</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="text"
                        name="name"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.name && touched.name
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.email && touched.email
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="password"
                        name="password"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.password && touched.password
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Create a strong password"
                      />
                    </div>
                    <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Confirm your password"
                      />
                    </div>
                    <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="number"
                        name="phone"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.phone && touched.phone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Address Field */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="text"
                        name="address"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.address && touched.address
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Enter your address"
                      />
                    </div>
                    <ErrorMessage name="address" component="p" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-4 rounded-xl font-semibold text-white text-base transition-all duration-200 shadow-lg ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Navigation Links */}
                  <div className="space-y-4 pt-4">
                    <div className="text-center">
                      <span className="text-gray-600">Already have an account? </span>
                      <Link to="/login/user" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                        Sign in here
                      </Link>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Link to="/" className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};