import { Home } from '../components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home page',
};

const HomePage: React.FC = () => {
  return (
    <main>
      <Home />
    </main>
  );
};

export default HomePage;
