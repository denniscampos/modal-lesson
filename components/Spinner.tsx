export default function Spinner() {
  // https://projects.lukehaas.me/css-loaders/
  // when I'm serious to change it.... lulz
  return (
    <div className="flex justify-center items-center">
      <div className="flex animate-spin bg-primary h-20 w-6 border-b-4 rounded-full"></div>
    </div>
  );
}
