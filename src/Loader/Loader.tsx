import React from "react";
import "./Loader.scss";

interface LoaderProps {
    size?: string;
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
    let className = '';

    if (size === 'sm') {
        className = 'loader--sm'
    }

  return (
    <div className={`loader ${className}`}>
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
