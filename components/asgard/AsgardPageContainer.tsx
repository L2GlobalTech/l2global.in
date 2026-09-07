import React from 'react';

interface AsgardPageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const AsgardPageContainer: React.FC<AsgardPageContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`p-4 sm:p-6 lg:p-8 w-full mx-auto ${className}`}>
      {children}
    </div>
  );
};
