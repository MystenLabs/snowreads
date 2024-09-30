import { Loader2 } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Loader2 className="w-16 h-16 text-[#8B28D2] animate-spin" />
    </div>
  );
};
