import * as z from "zod";

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

export const EventSchema = z.object({
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

// name?: string;
// rollNo?: string;
// department?: string;
// course?: string;
// sem?: number;  

// rollNo: z.number().min(6).max(6), 
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

