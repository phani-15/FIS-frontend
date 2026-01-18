import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import {
  ChevronsRight,
  Linkedin,
  Instagram,
  Github,
  Globe,
  Menu,
} from 'lucide-react';
import GetStartedModal from '../components/GetStartedModal';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroTitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const devCardsRef = useRef([]);

  const devs = [
    {
      avatar: '/images/phani.jpeg',
      name: 'Phani Polavarapu',
      github: 'https://github.com/phani-15',
      insta: 'https://www.instagram.com/iam_srinivas_19',
      linkedin: 'https://www.linkedin.com/in/phani-polavarapu-1957722a2/',
    },
    {
      avatar: '/images/vinay.jpg',
      name: 'Siringi Vinay',
      github: 'https://github.com/VINAY-67',
      insta: 'https://www.instagram.com/vinay_s__67/',
      linkedin: 'https://www.linkedin.com/in/vinay-siringi-130633307/',
    },
    {
      avatar: '/images/narendra.jpeg',
      name: 'Kura Narendra',
      github: 'https://github.com/Narendra-619',
      insta: 'https://www.instagram.com/_myself_nani_/',
      linkedin: 'https://www.linkedin.com/in/kura-narendrakumar-8589a0298/',
    },
  ];

  useEffect(() => {
    // HERO TEXT – character by character
    const titleChars = heroTitleRef.current.querySelectorAll('span');
    const textChars = heroTextRef.current.querySelectorAll('span');

    const tl = gsap.timeline();

    tl.fromTo(
      titleChars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: 'power2.out',
      }
    )
      .fromTo(
        textChars,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.015,
          duration: 1,
        },
        '-=0.2'
      )

    // HERO IMAGE – slide from right
    gsap.fromTo(
      heroImageRef.current,
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
      }
    );
  }, []);

useEffect(() => {
  const isMobile = window.innerWidth < 768;

  if (!isMobile) {
    // Desktop animation (keep your current one)
    gsap.fromTo(
      devCardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: devCardsRef.current[0],
          start: 'top 85%',
        },
      }
    );
    return;
  }

  // 📱 Mobile: alternate left & right
  devCardsRef.current.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        x: index % 2 === 0 ? 120 : -120, // even → right, odd → left
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.in',
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
        },
      }
    );
  });
}, []);


  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-indigo-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-900 flex items-center">
            <span className="bg-blue-900 text-white px-2 py-1 rounded mr-2">FIS</span>
            JNTUGV
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {[
              { label: 'Members', path: '/login' },
              { label: 'HOD', path: '/hod' },
              { label: 'Higher Officials', path: '/ofc' },
              { label: 'Admin', path: '/admin' },
            ].map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className="text-blue-900 font-medium hover:text-blue-700 transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <ul className="px-4 py-3 space-y-3">
              {[
                { label: 'Members', path: '/login' },
                { label: 'HOD', path: '/hod' },
                { label: 'Higher Officials', path: '/ofc' },
                { label: 'Admin', path: '/admin' },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-blue-900 font-medium hover:text-blue-700 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0  z-0"></div>
        <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl mx-auto bg-linear-to-r from-white to-blue-50 rounded-3xl p-8 lg:p-12 shadow-2xl border border-blue-100">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">

              <h1
                ref={heroTitleRef}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 leading-tight mb-6"
              >
                {'Faculty Information System'.split('').map((char, i) => (
                  <span key={i} className="inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
              <p
  ref={heroTextRef}
  className="text-gray-700 leading-relaxed text-justify mb-8"
>
  {`FIS is a comprehensive online platform designed for the faculty of JNTUGV. It enables faculty members to securely maintain and update their personal information, academic qualifications, certifications, publications, awards, and other professional accomplishments, thereby facilitating efficient academic administration and institutional record management.`
    .split(' ')
    .map((word, i) => (
      <span key={i} className="inline-block mr-1">
        {word.split('').map((char, j) => (
          <span key={j} className="inline-block">
            {char}
          </span>
        ))}
      </span>
    ))}
</p>

              <button
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center cursor-pointer bg-linear-to-r from-blue-800 to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
                <ChevronsRight className="ml-2" size={20} />
              </button>
            </div>

            {/* Hero Image */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <img
                  ref={heroImageRef}
                  src="/images/college.png"
                  draggable={false}
                  alt="JNTUGV Campus"
                  className="rounded-2xl shadow-2xl w-full max-w-md object-cover  border-4 border-white"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-60 blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developers Section */}
      <section className="py-16 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Meet the Minds Behind FIS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Crafted with care by a passionate team dedicated to academic excellence and digital innovation at JNTUGV.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {devs.map((dev, index) => (
              <div
                key={index}
                ref={(el) => (devCardsRef.current[index] = el)}
                className="group relative rounded-3xl p-6 bg-linear-to-br from-blue-200 via-indigo-200 to-purple-200 hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100 transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={dev.avatar}
                      draggable={false}
                      alt={dev.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/96?text=Dev';
                      }}
                    />
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-400 to-indigo-500 opacity-0 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{dev.name}</h3>
                  <div className="flex justify-center gap-3 mt-2">
                    {dev.linkedin && (
                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${dev.name} on LinkedIn`}
                        className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {dev.github && (
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${dev.name} on GitHub`}
                        className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-700 hover:bg-gray-800 hover:text-white transition-all duration-200 shadow-sm"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {dev.insta && (
                      <a
                        href={dev.insta}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${dev.name} on Instagram`}
                        className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-700 hover:bg-linear-to-br from-violet-500 to-pink-600 hover:text-white transition-all duration-200 shadow-sm"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-r from-blue-900 to-indigo-900 text-white pt-4 lg:pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-blue-200 mb-3">JNTUGV</h3>
              <p className="text-blue-100">Jawaharlal Nehru Technological University</p>
              <p className="text-blue-100">Gurajada, Vizianagaram</p>
              <p className="text-blue-100">Andhra Pradesh – 535003, India</p>
            </div>

            <div className="flex space-x-5 mb-2">
              <a
                href="https://www.linkedin.com/school/jntugv/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JNTUGV on LinkedIn"
                className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/jntu_gurajada/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JNTUGV on Instagram"
                className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-linear-to-br from-violet-500 to-pink-700 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://jntugv.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JNTUGV Official Website"
                className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-indigo-600 transition-colors duration-200"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div className="border-t border-blue-700/50  pt-6 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} Jawaharlal Nehru Technological University, Gurajada Vizianagaram. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <GetStartedModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}