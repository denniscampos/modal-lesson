import dayjs from 'dayjs';

export default function Post() {
  const date = dayjs().locale('en').add(1, 'day').format('MM/DD/YYYY');

  // couple of notes to think about
  // the days can be hardcoded since that will never change with the grid.
  // the date preferably MM/DD/YYYY can be dynamic from dayJS.

  // const days = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday,',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ]

  return (
    <div className="grid gap-4 grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-5 md:grid-rows-3 ">
      <div className="bg-blue-400">
        <h1 className="font-bold">{date}</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut facilis
          quae? Id necessitatibus sit tenetur est porro!
        </p>
      </div>
      <div className="bg-red-500">
        <h1 className="font-bold">title</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut facilis
          quae? Id necessitatibus sit tenetur est porro!
        </p>
      </div>
      <div className="bg-gray-500">
        <h1 className="font-bold">01/01/2022</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut facilis
          quae? Id necessitatibus sit tenetur est porro!
        </p>
      </div>
      <div className="bg-blue-400">
        <h1 className="font-bold">01/01/2022</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut facilis
          quae? Id necessitatibus sit tenetur est porro!
        </p>
      </div>
      <div className="bg-red-500">
        <h1 className="font-bold">01/01/2022</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut facilis
          quae? Id necessitatibus sit tenetur est porro!
        </p>
      </div>
    </div>
  );
}
