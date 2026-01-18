"use client";

import Image from "next/image";
import { Clock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const colors = {
  primary_Bg: "bg-[#121313]",
  secondary_Bg: "bg-[#1E1E1E]",
  special_Bg: "bg-[#64ACFF]",
  primary_Font: "text-[#FFFFFF]",
  secondary_Font: "text-[#B1AAA6]",
};

export type Course = {
  id: string;
  name: string;
  level: "BASIC" | "INTERMEDIATE" | "ADVANCE" | "ALL";
  description: string;
  duration?: string;
  thumbnail?: string;
  instructorName: string;
  isPublished: "PUBLISHED" | "NOT_PUBLISHED";
};

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const router = useRouter();

  const level = course.level?.toUpperCase();

  const isDraft = course.isPublished !== "PUBLISHED";

  const levelStyles =
    level === "BASIC"
      ? "text-grey-300"
      : level === "INTERMEDIATE"
        ? "text-yellow-400"
        : level === "ADVANCE"
          ? "text-red-400"
          : "text-gray-400";

  const handleNavigate = () => {
    router.push(`/admin-dashboard/courses/${course.id}`);
  };

  return (
    <div
      className={`
        group overflow-hidden rounded-2xl
        ${colors.secondary_Bg} ${colors.primary_Font}
        p-3 transition-all duration-300
        hover:-translate-y-1 hover:scale-[1.02]
        hover:shadow-[0_0_0_1px_#64ACFF,0_20px_40px_rgba(0,0,0,0.4)]
      `}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl">
        <Image
          src={course.thumbnail || "/images/jsCard.jpg"}
          alt="Course thumbnail"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-4">
        {/* Title + Delete */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            {course.name}
          </h3>

          {isDraft && (
            <span
              className="
        text-xs font-medium
        px-2.5 py-1
        rounded-full
        bg-slate-700/40
        text-slate-300
        border border-slate-600/40
      "
            >
              Draft
            </span>
          )}
        </div>

        {/* Level + Duration */}
        <div
          className={`flex items-center justify-between text-sm ${colors.secondary_Font}`}
        >
          <span
            className={`rounded-md bg-neutral-800 px-3 py-1 text-xs font-semibold ${levelStyles}`}
          >
            {level}
          </span>

          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
        </div>

        <p className="text-sm text-neutral-300 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black">
              {course.instructorName?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-neutral-300">
              {course.instructorName}
            </span>
          </div>

          <button
            onClick={handleNavigate}
            className="text-sm text-[#64ACFF] opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
          >
            Manage →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
