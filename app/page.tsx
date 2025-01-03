import styles from './Home.module.css';
import AboutUs from './components/HomePage/About';
import Hero from './components/HomePage/Hero';
import HorizontalScrollBackground from './components/HomePage/Gallery';
import Footer from './components/Footer';
export default function Home() {
  return (
      <main className={styles.main}>
          <Hero></Hero>
          <AboutUs></AboutUs>
          <HorizontalScrollBackground></HorizontalScrollBackground>
          <Footer></Footer>
      </main> 
  );
}
