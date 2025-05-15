"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ blog }) {
  return (
    <Link href={`/blog/${blog.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-transform duration-300">
        {/* Blog Card Image */}
        <div className="relative h-48 bg-purple-100">
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center overflow-hidden">
            {/* Placeholder for actual images */}
            <div className="text-white font-bold text-xl">{blog.title.charAt(0)}</div>
          </div>
          {blog.isPro && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">
              PRO
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">{blog.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">{blog.duration}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-500 text-sm">{blog.date}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              blog.difficulty === 'Beginner' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {blog.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}