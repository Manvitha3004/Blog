"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Make sure the casing matches the actual file name (blogdata.js with lowercase 'd')
import { blogData } from './lib/blogdata';

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter blogs based on search query
  const filteredBlogs = blogData.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Blogs</h2>
          <p className="text-gray-600">{filteredBlogs.length} blog posts available</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search blogs by title, description or tags..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filters Button */}
        <button 
          className="flex items-center text-purple-600 mb-6"
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        
        {/* Filters Section (conditionally rendered) */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Difficulty Level</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="ml-2">Beginner</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="ml-2">Advanced</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Duration</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="ml-2">Under 10 minutes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="ml-2">10-30 minutes</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Membership</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="ml-2">Free</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="ml-2">PRO</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogs.map(blog => (
            <Link href={`/blog/${blog.id}`} key={blog.id} className="group">
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
                    <span className="text-gray-500 text-sm">{blog.duration}</span>
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
          ))}
        </div>
        
        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.5 19.5v-2.5a2.5 2.5 0 012.5-2.5h4a2.5 2.5 0 012.5 2.5v2.5" />
              <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}