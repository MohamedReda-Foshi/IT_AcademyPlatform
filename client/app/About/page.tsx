// pages/about.jsx
import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="bg-black min-h-screen text-white">
     
      {/* Navigation */}
      

      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-red-900 to-black h-64 w-full absolute opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">About <span className="text-red-600">TechLearn</span></h1>
            <p className="mt-4 text-xl">Empowering IT Professionals Since 2020</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our <span className="text-red-600">Story</span></h2>
            <p className="mb-4">
              Founded in 2020, TechLearn began with a simple mission: to make high-quality IT education accessible to everyone, regardless of their background or location.
            </p>
            <p >
              What started as a small collection of programming tutorials has grown into a comprehensive platform offering over 500 courses across various IT disciplines, from web development and cybersecurity to cloud computing and artificial intelligence.
            </p>
            <p>
              Our team of industry professionals and educators work tirelessly to ensure our content remains cutting-edge and relevant in the rapidly evolving tech landscape.
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-800 to-black p-1 rounded-lg">
            <div className="h-80 bg-gray-900 rounded-lg relative overflow-hidden">
              {/* Replace with your actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600">[Team Image Placeholder]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gradient-to-r from-black to-red-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">Our <span className="text-red-600">Mission & Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-red-800">
              <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Excellence</h3>
              <p>We strive for excellence in our content, platform, and support to provide the best learning experience possible.</p>
            </div>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-red-800">
              <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Inclusivity</h3>
              <p>We believe everyone deserves access to quality education, and design our platform to be accessible to learners of all backgrounds.</p>
            </div>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-red-800">
              <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p>Technology never stands still, and neither do we. We continuously update our courses and platform with the latest advancements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Meet Our <span className="text-red-600">Team</span></h2>
          <p className="mt-4 max-w-2xl mx-auto">Our diverse team of educators, developers, and industry experts are passionate about sharing their knowledge.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="h-56 bg-red-900 relative">
              {/* Replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600">[Photo]</span>
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-medium text-xl">Sarah Johnson</h3>
              <p className="text-red-500">Founder & CEO</p>
              <p className="mt-2 text-gray-400 text-sm">Former software engineer with 15 years of experience in Silicon Valley</p>
            </div>
          </div>
          {/* Team Member 2 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="h-56 bg-red-900 relative">
              {/* Replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600">[Photo]</span>
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-medium text-xl">Michael Chen</h3>
              <p className="text-red-500">Head of Education</p>
              <p className="mt-2 text-gray-400 text-sm">PhD in Computer Science and former university professor</p>
            </div>
          </div>
          {/* Team Member 3 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="h-56 bg-red-900 relative">
              {/* Replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600">[Photo]</span>
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-medium text-xl">Priya Patel</h3>
              <p className="text-red-500">Lead Developer</p>
              <p className="mt-2 text-gray-400 text-sm">Full-stack developer specialized in educational platforms</p>
            </div>
          </div>
          {/* Team Member 4 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="h-56 bg-red-900 relative">
              {/* Replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-600">[Photo]</span>
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-medium text-xl">James Wilson</h3>
              <p className="text-red-500">Cybersecurity Expert</p>
              <p className="mt-2 text-gray-400 text-sm">Former security consultant for Fortune 500 companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-red-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white">500+</div>
              <div className="mt-2">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">50,000+</div>
              <div className="mt-2">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">30+</div>
              <div className="mt-2">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">120+</div>
              <div className="mt-2">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">What Our <span className="text-red-600">Students Say</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center mr-4">
                <span className="font-bold">JD</span>
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-red-500 text-sm">Web Developer</p>
              </div>
            </div>
            <p className="italic text-gray-300">The courses on TechLearn helped me transition from a warehouse worker to a full-stack developer in just 8 months. The quality of instruction is unmatched.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center mr-4">
                <span className="font-bold">AS</span>
              </div>
              <div>
                <h3 className="font-medium">Amanda Smith</h3>
                <p className="text-red-500 text-sm">Network Engineer</p>
              </div>
            </div>
            <p className="italic text-gray-300">After completing the Network Security certification path, I was able to secure a position at a major tech company with a 40% salary increase.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center mr-4">
                <span className="font-bold">RK</span>
              </div>
              <div>
                <h3 className="font-medium">Raj Kumar</h3>
                <p className="text-red-500 text-sm">Cloud Architect</p>
              </div>
            </div>
            <p className="italic text-gray-300">The hands-on labs and real-world projects make TechLearn stand out from other platforms. I was able to build a portfolio that impressed employers</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-900 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Start Your IT Career Journey?</h2>
          <p className="mb-8 text-lg">Join thousands of students who have transformed their careers with TechLearn.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link href="/courses" className="bg-white text-red-900 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition">
              Browse Courses
            </Link>
            <Link href="/signup" className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium transition">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  );
}