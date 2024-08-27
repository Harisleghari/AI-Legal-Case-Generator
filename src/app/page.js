'use client'
import './globals.css';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [caseDetails, setCaseDetails] = useState('');
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateBrief = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/generateBrief', { caseDetails }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { brief } = response.data;
      setBrief(brief);
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Legal Case Brief Generator</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the details of your case, and the generator will provide a brief summary and the applicable articles/sections.
        </p>
        <form className="space-y-4" onSubmit={handleGenerateBrief}>
          <textarea
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="6"
            placeholder="Enter case details here..."
          />
          <button type="submit" disabled={loading}
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
          >
            {loading ? 'Generating...' : 'Generate Brief'}
          </button>
        </form>
        {brief && (
          <div className="mt-4">
            <h2 className="font-semibold">Generated Brief:</h2>
            <p>{brief}</p>
          </div>
        )}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
}
