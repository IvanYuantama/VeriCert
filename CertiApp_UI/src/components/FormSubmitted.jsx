import React from 'react';

const FormSubmitted = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-yellow-600 text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg border border-yellow-500 text-center max-w-md animate-fadeIn">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow-lg">Certificate Issued Successfully!</h1>
        <p className="text-lg text-gray-200 mb-6">You can view your certificate on the home page.</p>
        <a
          href="/"
          className="bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default FormSubmitted;