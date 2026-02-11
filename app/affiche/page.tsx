import ModalComponent from './components/modal';
import Movies from './components/movies';

export default async function Affiche() {
  return (
    <div>
      <Movies />
      <ModalComponent />
    </div>
  );
}
