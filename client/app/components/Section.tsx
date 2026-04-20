import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faGraduationCap,
  faUsers,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="relative bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-r">
              Level Up Your Tech Skills with{" "}
              <span className="text-techred">TechLearn</span>
            </h1>
            <p className="text-lg text-gray-300">
              Master in-demand tech skills with expert-led courses. From coding
              to cloud computing, we ve got you covered with practical, hands-on
              learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-techred hover:bg-red-700 rounded-lg font-semibold flex items-center justify-center">
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Start Learning
              </button>
              <button className="px-8 py-3 border border-techred text-techred hover:bg-techred hover:text-white rounded-lg font-semibold">
                View Courses
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-3xl text-techred mb-2"
                />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-gray-400">Courses</p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-3xl text-techred mb-2"
                />
                <p className="text-2xl font-bold">10k+</p>
                <p className="text-sm text-gray-400">Students</p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faCertificate}
                  className="text-3xl text-techred mb-2"
                />
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Student learning"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-techred rounded-lg transform rotate-12"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-techgray rounded-lg transform -rotate-12"></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-techred opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-techgray opacity-10 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
};

export default Hero;