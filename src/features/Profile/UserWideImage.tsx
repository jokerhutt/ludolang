import { AnimatePresence } from "framer-motion";

type UserWideImageProps = {
  imgSrc: string;
};

export function UserWideImage({ imgSrc }: UserWideImageProps) {
  return (
    <AnimatePresence>
      <img
        className="w-auto h-50 lg:h-66 object-cover"
        src={imgSrc}
      />
    </AnimatePresence>
  );
}
