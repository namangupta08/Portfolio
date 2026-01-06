import Link from 'next/link'
import React from 'react'

function HeroSection() {
  return (
    <div className='flex flex-col justify-center items-center w-screen min-h-screen px-4 py-16'>
      {/* Hero Section */}
      <div className='max-w-4xl mx-auto text-center mb-16'>
        <h1 className='font-bold text-6xl md:text-7xl bg-gradient-to-b from-neutral-700 to-neutral-50 bg-clip-text text-transparent p-4 mb-6'>
          Naman Gupta
        </h1>
        <p className='p-4 text-xl md:text-2xl bg-gradient-to-r from-gray-600 bg-clip-text text-transparent to-gray-300 mb-8'>
          Full-Stack Developer | Building scalable web applications with modern technologies
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
          <Link href="mailto:namangupta053@gmail.com">
            <button className='bg-gray-300 w-full sm:w-[9rem] p-4 rounded-xl hover:scale-110 text-black font-semibold transition-transform'>
              Contact Me
            </button>
          </Link>
          <Link href={"/projects"}>
            <button className='bg-blue-400 w-full sm:w-[9rem] p-4 rounded-xl hover:scale-110 font-semibold transition-transform'>
              View Projects
            </button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className='max-w-4xl mx-auto mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-neutral-700 to-neutral-500 bg-clip-text text-transparent'>
          About Me
        </h2>
        <p className='text-lg md:text-xl text-gray-300 text-center leading-relaxed px-4'>
          I am a passionate full-stack developer with expertise in building modern web applications. 
          I specialize in creating seamless user experiences while ensuring robust backend functionality. 
          My experience spans across various technologies and frameworks, allowing me to deliver 
          end-to-end solutions that are both scalable and maintainable.
        </p>
      </div>

      {/* Skills Section */}
      <div className='max-w-5xl mx-auto mb-16 w-full'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-neutral-700 to-neutral-500 bg-clip-text text-transparent'>
          Skills & Technologies
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform'>
            <h3 className='text-lg font-semibold text-white mb-3'>Languages</h3>
            <p className='text-gray-400 text-sm'>C++, JavaScript, Python, TypeScript, SQL</p>
          </div>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform'>
            <h3 className='text-lg font-semibold text-white mb-3'>Core CS</h3>
            <p className='text-gray-400 text-sm'>Data Structures & Algorithms, OOP, System Design, DBMS</p>
          </div>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform'>
            <h3 className='text-lg font-semibold text-white mb-3'>Frameworks/Libraries</h3>
            <p className='text-gray-400 text-sm'>React.js, Next.js, Express.js, Node.js, Redux, Zustand</p>
          </div>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform'>
            <h3 className='text-lg font-semibold text-white mb-3'>UI Development</h3>
            <p className='text-gray-400 text-sm'>HTML5, CSS3, Tailwind CSS, Bootstrap</p>
          </div>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform'>
            <h3 className='text-lg font-semibold text-white mb-3'>Databases</h3>
            <p className='text-gray-400 text-sm'>MongoDB, MySQL, Firebase</p>
          </div>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform'>
            <h3 className='text-lg font-semibold text-white mb-3'>Developer Tools</h3>
            <p className='text-gray-400 text-sm'>Git, GitHub, Postman</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-neutral-700 to-neutral-500 bg-clip-text text-transparent'>
          Let's Build Something Amazing Together
        </h2>
        <p className='text-gray-400 mb-6'>
          I'm always open to discussing new projects and opportunities.
        </p>
        <Link href="mailto:namangupta053@gmail.com">
          <button className='bg-gradient-to-r from-blue-500 to-blue-600 w-full sm:w-[12rem] p-4 rounded-xl hover:scale-110 font-semibold text-white transition-transform'>
            Get In Touch
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection