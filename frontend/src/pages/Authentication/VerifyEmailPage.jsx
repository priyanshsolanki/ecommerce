import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userpool from '../../aws/cognitoConfig';
import { CognitoUser } from "amazon-cognito-identity-js";
import { toast } from 'react-toastify';
import { Mail, ShoppingBag, CheckCircle } from 'lucide-react';

const validationSchema = Yup.object({
  code: Yup.string()
    .required('Verification code is required')
    .min(6, 'Verification code must be 6 digits')
    .matches(/^\d+$/, 'Verification code must contain only numbers'),
});

const VerificationEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    code: '',
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const state = location.state;
      
      if (!state || !state.username) {
        toast.error("Session expired. Please register again.", {
          position: "top-right",
          theme: "dark",
        });
        navigate('/register/user');
        return;
      }

      const userData = {
        Username: state.username,
        Pool: userpool,
      };

      const cognitoUser = new CognitoUser(userData);
      
      cognitoUser.confirmRegistration(values.code, true, function (err, result) {
        if (err) {
          toast.error("Invalid verification code. Please try again.", {
            position: "top-right",
            theme: "dark",
          });
          setFieldError('code', 'Invalid verification code');
          setSubmitting(false);
          return;
        }
        
        toast.success("Email verified successfully! You can now sign in.", {
          position: "top-right",
          theme: "dark",
        });
        setSubmitting(false);
        navigate('/login/user');
      });
    } catch (error) {
      toast.error("An unexpected error occurred", {
        position: "top-right",
        theme: "dark",
      });
      setSubmitting(false);
    }
  };

  const handleResendCode = () => {
    const state = location.state;
    if (!state || !state.username) {
      toast.error("Session expired. Please register again.", {
        position: "top-right",
        theme: "dark",
      });
      navigate('/register/user');
      return;
    }

    const userData = {
      Username: state.username,
      Pool: userpool,
    };

    const cognitoUser = new CognitoUser(userData);
    
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        toast.error("Failed to resend verification code", {
          position: "top-right",
          theme: "dark",
        });
        return;
      }
      toast.success("Verification code resent to your email", {
        position: "top-right",
        theme: "dark",
      });
    });
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
              <Mail className="w-20 h-20 text-white" />
            </div>
            <h2 className="text-5xl font-bold mb-6">Almost There!</h2>
            <p className="text-xl text-blue-100 max-w-md mx-auto leading-relaxed mb-8">
              We've sent a verification code to your email. Enter it below to complete your registration.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto">
              <div className="flex items-center justify-center space-x-4 text-blue-100">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg">Check your inbox</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-block mb-4">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
              <p className="text-gray-600 text-lg mb-4">
                Enter the 6-digit code sent to your email
              </p>
              {location.state?.username && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 inline-block">
                  <p className="text-sm text-blue-700 font-medium">
                    {location.state.username}
                  </p>
                </div>
              )}
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Verification Code Field */}
                  <div>
                    <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                      Verification Code
                    </label>
                    <Field
                      type="text"
                      name="code"
                      maxLength="6"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-3xl font-mono tracking-widest ${
                        errors.code && touched.code ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="000000"
                      autoComplete="one-time-code"
                    />
                    <ErrorMessage name="code" component="p" className="mt-2 text-sm text-red-600 text-center" />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-4 rounded-xl font-semibold text-white text-base transition-all duration-200 shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        Verify Email
                      </>
                    )}
                  </button>

                  {/* Additional Actions */}
                  <div className="space-y-4">
                    {/* Resend Code */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Didn't receive the code? Resend
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="pt-4 border-t border-gray-200 space-y-3">
                      <div className="text-center">
                        <Link to="/login/user" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                          Already verified? Sign in
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link to="/" className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Help Text */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Quick Tips</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check your spam/junk folder</li>
                    <li>• Code expires in 24 hours</li>
                    <li>• Use the resend option if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmail;