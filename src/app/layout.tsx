import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Header, ReduxPageWrapper } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Login form and table',
  description: 'Generated by create next app',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 5,
};

const contentStyle: React.CSSProperties = {
  marginTop: '60px', 
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ReduxPageWrapper>
          <div style={containerStyle}>
            <div style={headerStyle}>
              <Header />
            </div>
            
            <div style={contentStyle}>
              {children}
            </div>
          </div>
        </ReduxPageWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
