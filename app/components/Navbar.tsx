'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { name: 'What We Do', href: '/#services', color: '#DB4437' },
  { name: 'Highlights', href: '/Highlights', color: '#0F9D58' },
  { name: 'Team GDG', href: '/TeamGDG', color: '#4285F4' },
  { name: 'About Us', href: '/About', color: '#F4B400' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10

      setVisible(isVisible)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 w-full text-center transition-transform duration-300 ease-in-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-4 my-2 rounded-full border-2 border-gray-200 bg-white shadow transition-all duration-300 ease-in-out hover:shadow-xl dark:border-gray-700 dark:bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/symbol.webp"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="hidden md:block max-h-full w-full min-w-[50px] max-w-[100px]"
                  quality={100}
                />
                <Image
                  src="/symbol.webp"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="md:hidden max-w-[85px] translate-y-[2px]"
                  quality={100}
                />
                <span className="text-lg font-semibold text-black dark:text-white rounded-full border border-gray-500 px-3 py-1 bg-gray-800 ">
                  IIT Mandi
                </span>
              </Link>
              

              {/* Desktop navigation */}
              <div className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{ backgroundColor: item.color }}
                    className="hero-text rounded-full px-3 py-2 text-center text-black transition-colors duration-200 hover:bg-gray-700 hover:text-white dark:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-full p-2 text-black hover:bg-gray-200 focus:outline-none dark:text-white dark:hover:bg-gray-700 md:hidden"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-24 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`mx-4 overflow-hidden rounded-3xl border-2 border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-black ${
            isOpen ? 'max-h-[calc(100vh-7rem)]' : 'max-h-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 pb-4 pt-5">
            <nav className="grid gap-y-8 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ backgroundColor: item.color }}
                  className="rounded-full px-3 py-2 font-medium text-black transition-colors duration-200 hover:bg-gray-700 hover:text-white dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
