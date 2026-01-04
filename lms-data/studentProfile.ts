import { allPrograms } from "@/lms-data/programs";
import { getTuitionForProgram } from "@/lms-data/tuition";
import { getCoursesForProgram } from "@/lms-data/courses";

export type ProgramEngagementStatus =
  | "interested"
  | "applied"
  | "enrolled"
  | "in-progress"
  | "completed";

export interface StudentProgramStatus {
  programId: string;
  status: ProgramEngagementStatus;
  notes?: string;
}

export interface DemoStudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  programs: StudentProgramStatus[];
}

export const demoStudentProfile: DemoStudentProfile = {
  id: "demo-student",
  firstName: "Sample",
  lastName: "Learner",
  email: "student@example.com",
  programs: [
    {
      programId: "prog-cna",
      status: "interested",
      notes: "Wants to explore CNA & healthcare options.",
    },
    {
      programId: "prog-barber",
      status: "enrolled",
      notes: "Barber apprenticeship with shop partner.",
    },
    {
      programId: "prog-tax-vita",
      status: "applied",
      notes: "Tax/VITA as a way into office roles.",
    },
  ],
};

export function getStudentProgramOverview() {
  return demoStudentProfile.programs.map((p) => {
    const program = allPrograms.find((prog) => prog.id === p.programId) || null;
    const tuition = getTuitionForProgram(p.programId);
    const courses = getCoursesForProgram(p.programId);
    return { status: p, program, tuition, courses };
  });
}
