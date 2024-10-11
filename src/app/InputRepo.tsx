import Input from "./Input";

const InputRepo = () => {
  return (
    <div className="flex gap-x-2.5 items-center justify-center w-full max-w-2xl">
      <Input placeholder="owner"  />
      <p className="text-4xl">/</p>
      <Input placeholder="repository" />
    </div>
  );
};

export default InputRepo;