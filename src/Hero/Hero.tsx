import React from "react";
import { useImageLoaded } from "./../Img";
import Loader from "./../Loader";
import "./Hero.scss";

interface HeroProps {
  image: string;
  title: string;
  description: string;
  subDescription: string;
  learnMoreLink: string;
  preorderLink: string;
}

const Hero: React.FC<HeroProps> = ({
  image,
  title,
  description,
  subDescription,
  learnMoreLink,
  preorderLink,
}) => {
  const { loaded } = useImageLoaded(image);

  if (!loaded) {
    return <Loader />;
  }

  return (
    <div className="hero__container">
      <img src={image} alt={title} className="hero__image" />
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__desc">{description}</p>
        <p className="hero__sub-desc">{subDescription}</p>
        <div className="hero__cta-buttons">
          <a href={learnMoreLink} className="hero__cta-link hero__cta-link--lm">
            Learn More
          </a>
          <a href={preorderLink} className="hero__cta-link hero__cta-link--po">
            Preorder Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
