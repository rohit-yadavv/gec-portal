import { z } from "zod";



export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(50),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
})

export const EnrollmentSchema = z.object({
  type: z.string().min(2),
  courseCode: z.string().min(2),
  courseName: z.string().min(2),
  desc: z.string().min(2),
  department: z.string().min(2),
  teacher: z.string().min(2),
  sem: z.number().positive(),
  eligible: z.string().min(2),
  seats: z.number().positive(),
  courseCredit: z.number().positive(),
  applyBy: z.date()
})

export const EventSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters"),
  // eventPoster: z.instanceof(FileList).optional(),
  eventDesc: z.string().min(10, "Event description must be at least 10 characters"),
  department: z.string(),
  applyBy: z.date()
});



export const BroadcastSchema = z.object({
  mailToStudentsOf: z.string().min(2, { message: "select form to which you want to send mail" }),
  subject: z.string().min(1, { message: "write a valid subject" }),
  body: z.string().min(1, { message: "write a valid body to send in mail" }),
})

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(4, {message: "Password should be of min 4 digits"}),
  confirmPassword: z.string().min(4, {message: "Password should be of min 4 digits"}),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const RegistrationSchema = z.object({
  name: z.string().min(3).max(50),
  rollNo: z
    .number()
    .int()
    .refine((value) => value >= 100000 && value <= 999999, {
      message: 'Roll number must be a 6-digit number',
    }),
  department: z.string().min(2).max(100),
  course: z.string().min(2).max(50),
  sem: z
    .number()
    .int()
    .refine((value) => value > 0 && value <= 10, {
      message: 'Write Semester in 1 digit',
    }),
})


export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid Email" }),
  password: z.string(),
})