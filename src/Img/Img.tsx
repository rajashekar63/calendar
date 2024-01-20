import React, { useState, useEffect, ImgHTMLAttributes } from "react";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string;
  src: string;
  alt: string;
  className?: string;
}

const Img: React.FC<ImgProps> = ({
  placeholderSrc,
  src,
  className = "",
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(placeholderSrc || src);
  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onerror = () => {
      setImgSrc(src);
    };
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      {...props}
      alt={alt}
      className={`img ${className} img--${customClass}`}
    />
  );
};

export default Img;
