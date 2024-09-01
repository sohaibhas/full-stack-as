import React from 'react';
import profile from "../../assets/robott.png"
import Image from 'next/image';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <Image
            src={profile}// Replace with your profile picture URL
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sohaib Hassan</h1>
          <p className="text-gray-600 text-center">
            A passionate software engineer with experience in full-stack web development. I enjoy building dynamic and
            interactive applications using modern web technologies.
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>JavaScript, TypeScript, React</li>
            <li>Node.js, Express, MongoDB, MYSQL</li>
            <li>HTML, CSS, Tailwind CSS</li>
            <li>Git, GitHub, CI/CD</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Hobbies</h2>
          <p className="text-gray-600">
            In my free time, I love to explore new technologies, contribute to open-source projects, and enjoy playing
            guitar. I also have a keen interest in traveling and photography.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
