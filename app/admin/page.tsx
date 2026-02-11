import FormMovies from './components/form-movies';
import PreviewMovies from './components/preview-movies';
import styles from './styles.module.scss';

export default async function Admin() {
  return (
    <div className={styles.main}>
      <FormMovies />
      <div className={styles.hr} />
      <PreviewMovies />
    </div>
  );
}
