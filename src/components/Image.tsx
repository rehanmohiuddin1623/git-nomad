import React from "react";

const Image = ({
  src,
  alt,
  dimensions = { width: 100, height: 100 },
}: {
  src: string;
  alt: string;
  dimensions?: { width: number; height: number };
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default Image;
