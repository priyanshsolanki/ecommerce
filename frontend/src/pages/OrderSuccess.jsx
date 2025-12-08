import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {/* Order ID Box */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-sm text-gray-600 font-medium mb-2">Order ID</p>
            <p className="text-2xl font-bold text-gray-900 font-mono tracking-wider">
              #{id}
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <svg className="w-8 h-8 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-gray-600 font-medium">Email Confirmation</p>
              <p className="text-xs text-gray-500 mt-1">Sent to your inbox</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <svg className="w-8 h-8 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xs text-gray-600 font-medium">Processing</p>
              <p className="text-xs text-gray-500 mt-1">Preparing your order</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <svg className="w-8 h-8 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <p className="text-xs text-gray-600 font-medium">Estimated Delivery</p>
              <p className="text-xs text-gray-500 mt-1">3-5 business days</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/user/shop"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue Shopping
            </a>
            
            <a
              href="/orders"
              className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              View Orders
            </a>
          </div>

          {/* Support Link */}
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-500">
              Need help? <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
            </p>
          </div>
        </div>

        {/* What's Next */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Order Confirmation</p>
                <p className="text-sm text-gray-600">You'll receive an email with your order details</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Preparing Your Order</p>
                <p className="text-sm text-gray-600">We'll carefully pack your items for shipping</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Shipping Update</p>
                <p className="text-sm text-gray-600">Track your package with the tracking number we'll send you</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900">Delivery</p>
                <p className="text-sm text-gray-600">Your order arrives at your doorstep!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}