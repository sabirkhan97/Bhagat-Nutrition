import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-8xl font-display font-bold text-dark-700 mb-4">404</div>
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-dark-300 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary"><ArrowLeft size={18} /> Go Home</Link>
    </div>
  );
}
