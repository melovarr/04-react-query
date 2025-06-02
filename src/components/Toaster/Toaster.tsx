import { Toaster } from "react-hot-toast";

export default function ToasterMessage() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
