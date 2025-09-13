import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
      <p className="text-red-600 font-semibold">{message}</p>
      <button
        onClick={onRetry || (() => window.location.reload())}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorMessage;