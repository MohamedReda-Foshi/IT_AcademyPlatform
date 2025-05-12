import React from 'react'
import Image from 'next/image'
import Button from '@/app/components/Button'
import FAQSection from '@/app/components/FAQSection'

function Coursepage() {
  return (
        <div className="py-20 px-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course List */}
            <div className="flex-1 space-y-10">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg p-6">
                  {/* Title */}
                  {Namecourse && (
                    <h2 className="text-3xl uppercase font-bold lg:hidden">
                      {course.Namecourse}
                    </h2>
                  )}
    
                  {/* Hero Image */}
                  <Image
                    className="rounded-lg lg:hidden mb-4"
                    src={course.imageUrl||defaultImage}
                    width={600}
                    height={400}
                    alt={course.Namecourse}
                    style={{ objectFit: 'cover' }}
                  />
    
                  {/* Description & Button */}
                  <div className="space-y-4 mb-6">
                    {Namecourse && (
                      <h3 className="text-3xl uppercase font-bold hidden sm:block">
                        {course.Namecourse}
                      </h3>
                    )}
                    <p>{course.DescriptionCourse}</p>
                    <Button button="Get Started" />
                  </div>
    
                  {/* Overview */}
                  <div className="py-4">
                    <p className="italic">
                      <span className="font-bold">Overview:</span> {course.DescriptionCourse}
                    </p>
                  </div>
    
                  {/* Learning Goals */}
                  <h4 className="text-2xl mb-2">Here’s what you will learn:</h4>
                  <FAQSection />
                </div>
              ))}
            </div>
    
            {/* Sidebar */}
            <aside className="w-full lg:w-1/3 bg-red-500 p-6 space-y-6 text-white rounded-lg">
              <Image
                className="rounded-lg hidden sm:block mb-6"
                src={
                  courses[0]?.imageUrl ??
                  'https://tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg'
                }
                width={600}
                height={400}
                alt={courses[0]?.Namecourse || 'Course image'}
                style={{ objectFit: 'cover' }}
              />
    
              <div className="space-y-2">
                <p className="font-bold">
                  Duration:{' '}
                  {courses[0]?.duration != null
                    ? `${courses[0].duration} hours`
                    : 'N/A'}
                </p>
                <p className="font-bold uppercase">Category: {courses[0]?.category}</p>
                <p>Level: {courses[0]?.level}</p>
              </div>
    
              <hr className="border-white/50" />
    
              <div>
                <h5 className="font-bold">Achievements</h5>
                <p className="text-sm">
                  Earn a certificate, XP points, and more as you complete lessons.
                </p>
              </div>
    
              <hr className="border-white/50" />
    
              <div>
                <h5 className="font-bold text-lg">Skills You Will Learn</h5>
                <p>Procedural Programming, Computer Programming, …</p>
              </div>
            </aside>
          </div>
        </div>
  )
}

export default Coursepage