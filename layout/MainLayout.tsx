import React from 'react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="flex justify-center min-h-screen">
    //   <div className="flex gap-3">{children}</div>
    // </div>
    <div className="flex justify-center min-h-screen m-10">
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
