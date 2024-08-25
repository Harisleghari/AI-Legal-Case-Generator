import './globals.css';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Legal Case Brief Generator</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the details of your case, and the generator will provide a brief summary and the applicable articles/sections.
        </p>
        <form className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="6"
            placeholder="Enter case details here..."
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
          >
            Generate Brief
          </button>
        </form>
      </div>
    </div>
  );
}
