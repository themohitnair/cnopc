import Generate from "./Generate";
import InputRepo from "./InputRepo";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center min-h-screen">
        <InputRepo />
        <Generate />
      </div>
    </div>
  );
}