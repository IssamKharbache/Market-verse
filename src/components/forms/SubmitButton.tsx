import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../spinner/LoadingSpinner";

const SubmitButton = ({
  children,
  isImageUploading,
}: {
  children: ReactNode;
  isImageUploading?: boolean;
}) => {
  const { pending } = useFormStatus();
 
  if (pending || isImageUploading) {
    return (
      <button className="flex gap-4 items-center justify-center border opacity-70 border-primary font-bold duration-300 text-primary px-4 py-2 rounded-md mt-8  w-full cursor-not-allowed">
        <LoadingSpinner />
      </button>
    );
  }

  return (
    <button className="border border-primary font-bold hover:bg-primary-hover hover:text-white  duration-300 text-primary px-4 py-2 rounded-md mt-8  w-full">
      {children}
    </button>
  );
};

export default SubmitButton;

//
