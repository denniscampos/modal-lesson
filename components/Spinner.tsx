export default function Spinner() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="animate-spin ease-linear rounded-full border-[3px] border-t-[3px] border-primary border-t-secondary h-8 w-8"></div>
    </div>
  );
}
