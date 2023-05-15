import React from 'react';
import { Header } from '.';
import { Footer } from './Footer';


export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
