import styles from './Home.module.css';
import Hero from './components/HomePage/Hero';
export default function Home() {
  return (
      <main className={styles.main}>
          <Hero></Hero>
      </main> 
  );
}
