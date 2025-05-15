"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
// Make sure the casing matches the actual file name (blogdata.js with lowercase 'd')
import { blogData } from '../lib/blogdata';

export default function BlogPost() {
  const router = useRouter();
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (params.id) {
      // Convert string id to number if needed
      const blogId = parseInt(params.id);
      const foundBlog = blogData.find(b => b.id === blogId);
      
      if (foundBlog) {
        setBlog(foundBlog);
        
        // Find related blogs with the same tags (excluding current blog)
        const related = blogData
          .filter(b => b.id !== blogId && b.tags.some(tag => foundBlog.tags.includes(tag)))
          .slice(0, 3); // Get up to 3 related blogs
        
        setRelatedBlogs(related);
      } else {
        // Blog not found, redirect to blogs page
        router.push('/blog');
      }
      
      setLoading(false);
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h1>
        <Link href="/blog" className="text-purple-600 hover:underline">
          Return to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 12L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="ml-2 text-xl font-bold text-purple-600">HiDevs</span>
                </Link>
              </div>
              <div className="ml-6">
                <Link href="/blog" className="text-lg font-medium text-purple-700 hover:text-purple-500 transition-colors duration-300">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 mr-2">HiDevs Score:</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-purple-600">416/800</span>
                </div>
              </div>
              <div className="ml-4 relative">
                <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
              <div className="ml-4 relative">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                  M
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/blog" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 mb-6 group">
          <svg className="h-4 w-4 mr-1 transition-transform duration-300 transform group-hover:-translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to all blogs
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-64 bg-gray-300 relative">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{blog.title.charAt(0)}</span>
            </div>
            {blog.isPro && (
              <div className="absolute top-4 left-4 bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded">
                PRO
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap items-center mb-4 gap-2">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                blog.difficulty === 'Beginner' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {blog.difficulty}
              </span>
              <span className="text-sm text-gray-600">{blog.duration}</span>
              <span className="text-sm text-gray-600">{blog.date}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                {blog.author.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: blog.content
                  .replace(/\n/g, '<br />')
                  .replace(/## (.*)/g, '<h2 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h2>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
              }} />
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors duration-300 cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {blog.isPro && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Start this project</h3>
                <button className="w-full py-3 rounded-md text-center font-medium bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors duration-300">
                  Upgrade to Pro
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map(relatedBlog => (
                <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-transform duration-300">
                    <div className="relative h-40 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{relatedBlog.title.charAt(0)}</span>
                      {relatedBlog.isPro && (
                        <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">
                          PRO
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">{relatedBlog.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedBlog.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-gray-500 text-sm">{relatedBlog.duration}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          relatedBlog.difficulty === 'Beginner' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {relatedBlog.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* CTA Section */}
      <div className="bg-purple-50 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to improve your developer skills?</h2>
            <p className="text-lg text-gray-600 mb-6">Explore more projects and tutorials to level up your abilities.</p>
            <Link href="/blog" className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors duration-300">
              Browse All Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}