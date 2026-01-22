import type { Lesson } from "@/lms-data/courses";
import { VideoLessonPlayer } from "@/components/course/VideoLessonPlayer";
import { ScormLaunchPanel } from "@/components/course/ScormLaunchPanel";

interface Props {
  lesson: Lesson;
}

export function UniversalLessonPlayer({ lesson }: Props) {
  if (lesson.type === "video") {
    return <VideoLessonPlayer lesson={lesson} />;
  }

  if (lesson.type === "scorm") {
    return <ScormLaunchPanel lesson={lesson} />;
  }

  // Fallback for future lesson types (pdf, quiz, external, etc.)
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
      <p className="text-[11px] font-semibold text-white">{lesson.title}</p>
      {lesson.description && (
        <p className="mt-1 text-slate-300">{lesson.description}</p>
      )}
      <p className="mt-1 text-[10px] text-slate-500">
        This lesson type is not fully configured yet in the player. An Elevate
        admin can enable it later.
      </p>
    </div>
  );
}
