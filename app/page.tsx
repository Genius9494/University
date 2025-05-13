// app/page.tsx
import React from 'react';
import Checkout from './components/Checkout'; // تأكد من المسار الصحيح

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Stripe Payment Page</h1>
      <Checkout />
    </div>
  );
};

export default Home;
