import Navbar from '@/components/shared/Navbar/Navbar';
import React from 'react';

const layout = ({children}:{
    children: React.ReactNode
  }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default layout;