import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const links = [
    { name: 'Highlights', color: '#4285F4', linkto:'Highlights' },   // Blue
    { name: 'Team GDG', color: '#EA4335', linkto:'TeamGDG'},  // Red
    { name: 'About', color: '#FBBC05', linkto:'About'},  // Yellow
    { name: 'GDG', color: '#34A853', linkto:'https://developers.google.com/community/gdg'}, // Green
  ];

  return (
    <nav className={styles.navbar}>
      <a href='#'  >
      <Image src="/logo.jpeg" alt="GDG Logo" width={200} height={100} className={styles.logo}/>
      </a>
      <div className={styles.linkContainer}>
        {links.map((link, index) => (
          <Link
            key={index}
            href={`/${link.linkto}`} 
            style={{ backgroundColor: link.color }}
            className={styles.link}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
