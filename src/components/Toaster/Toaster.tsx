import { Toaster } from "react-hot-toast";

export default function ToasterMessage() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
