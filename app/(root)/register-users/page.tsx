import RegisterUserForm from "@/components/shared/form/RegisterUserForm";
import { getUserByToken } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

export default async function page() {
  const mongoUser = await getUserByToken();

  if (!mongoUser) {
    return;
  }

  const user = JSON.parse(mongoUser);
  console.log(user);

  const isAdmin = user?.admin;
  const isHod = user?.hod;
  const isTeacher = user?.teacher;

  if (!isAdmin && !isHod && !isTeacher) {
    redirect("/");
    return;
  }

  return (
    <>
      {isAdmin ? (
        <div className="pb-10">
          <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="mb-4 text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
              Register Hods / Teachers / Students
            </h1>
          </div>
          <RegisterUserForm registerBy="admin" />
        </div>
      ) : isHod ? (
        <div className="py-10">
          <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="mb-4 text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
              Register Teachers
            </h1>
          </div>
          <RegisterUserForm registerBy="hod" />
        </div>
      ) : isTeacher ? (
        <div className="py-10">
          <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="mb-4 text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
              Register Students
            </h1>
          </div>
          <RegisterUserForm registerBy="teacher" />
        </div>
      ) : null}
    </>
  );
}
