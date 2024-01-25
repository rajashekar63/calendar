import React, { ImgHTMLAttributes } from "react";
import useImgLoaded from "./useImgLoaded";
import Loader from "../Loader";

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
  const { loaded } = useImgLoaded(src);
  const customClass = loaded ? "loading" : "loaded";

  if (!loaded && !placeholderSrc) {
    return <Loader size='sm'/>;
  }

  return (
    <img
      src={loaded ? src : placeholderSrc}
      {...props}
      alt={alt}
      className={`img ${className} img--${customClass}`}
    />
  );
};

export default Img;
