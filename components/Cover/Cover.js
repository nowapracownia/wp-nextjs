// for classNames and generally css we're using Tailwind CSS here

import Image from "next/image";

export const Cover = ({ children, background }) => {
  return (
    <div className="h-screen text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center">
      <Image
        alt="Cover"
        src={background}
        fill
        className="object-cover mix-blend-soft-light"
      />
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
