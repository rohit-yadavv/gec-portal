import { FaUsers, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa"; 

const Services = () => { 
  return (
    <section className="py-24">
      <div className="flex size-full flex-wrap items-center justify-center gap-6">
        <div className="card-wrapper flex flex-col items-center justify-center rounded-lg border bg-light-850 p-8 shadow-md dark:bg-dark-100">
          <FaUsers className="size-8 fill-[#ff7000]" />
          <h3 className="mt-4">Register for GEC, VAC, and Events.</h3>
        </div>

        <div className="card-wrapper flex flex-col items-center justify-center rounded-lg border bg-light-850 p-8 shadow-md dark:bg-dark-100">
          <FaChalkboardTeacher className="size-8 fill-[#ff7000]" />
          <h3 className="mt-4">Post GEC, VAC, and Events for students.</h3>
        </div>

        <div className="card-wrapper flex flex-col items-center justify-center rounded-lg border bg-light-850 p-8 shadow-md dark:bg-dark-100">
          <FaCalendarAlt className="size-8 fill-[#ff7000]" />
          <h3 className="mt-4">View upcoming events and important dates.</h3>
        </div>
      </div>
    </section>
  );
};

export default Services;
