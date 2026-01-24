"use client";

import { useEffect, useState } from "react";
// getAllCourses -> Courses
import { getAllCourses } from "@/api/courses/course/get-all-courses";

import { User } from "lucide-react";
import Link from "next/link";

/* ---------------- TYPES ---------------- */

type StatsMap = Record<string, number>;

type HeaderProps = {
  name: string;
  email: string;
};

type EntityTabsProps = {
  fields: string[];
  data: StatsMap;
};

/* ---------------- HEADER ---------------- */
function Header({ name, email }: HeaderProps) {
  return (
    <div className="flex justify-between p-4">
      <div>
        <span className="text-primaryBlue text-5xl">Greetings,</span>{" "}
        <span className="text-white text-5xl">Student</span>
        <div className="mt-2 text-lg">
          <span className="text-white">Enjoy managing</span>{" "}
          <span className="text-primaryBlue">B</span>
          <span className="text-white">itwise Learn</span>
        </div>
      </div>

      <div className="flex mr-11">
        <div className="p-8 bg-white rounded-full flex justify-center items-center">
          <User size={35} color="black" />
        </div>
        <div className="text-white flex flex-col mt-3 ml-4">
          <h1 className="text-3xl">{name}</h1>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- URL MAP ---------------- */
const URL_MAP: Record<string, string> = {
  courses: "/courses",
};

/* ---------------- HERO SECTION ---------------- */
export default function HeroSection() {
  const [tabs, setTabs] = useState<StatsMap>({});
  const [courses, setCourses] = useState<StatsMap>({});
  const [fields, setFields] = useState<string[]>([]);

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourses(data.data);
    }
    );
  }, []);


  useEffect(() => {
    setTabs({
      courses: courses.length || 0,
    })

  }, [courses]);

  useEffect(() => {
    setFields(Object.keys(tabs));
  }, [tabs]);

  return (
    <>
      <Header name="Britto Anand" email="brittoanand@example.com" />

      <EntityTabs fields={fields} data={tabs} />
    </>
  );
}

/* ---------------- ENTITY TABS ---------------- */
import { School, Users, ShieldCheck, GraduationCapIcon } from "lucide-react";

const ENTITY_META: Record<
  string,
  {
    icon: any;
    label: string;
    tagline: string;
    accent: string;
  }
> = {
  courses: {
    icon: ShieldCheck,
    label: "Courses",
    tagline: "Programs offered for learning",
    accent: "from-purple-500/20 to-purple-500/5",
  },
};

function EntityTabs({ fields, data }: EntityTabsProps) {
  if (!fields.length) {
    return <p className="text-white/60 text-center mt-6">Loading dashboard…</p>;
  }

  return (
    <div className="mx-20 mt-8 grid grid-cols-2 gap-3">
      {fields.map((field) => {
        const meta = ENTITY_META[field];
        const href = URL_MAP[field];
        if (!meta || !href) return null;

        const Icon = meta.icon;

        return (
          <Link
            key={field}
            href={href}
            className="
              group relative rounded-2xl p-6
              bg-divBg overflow-hidden
              hover:shadow-2xl hover:-translate-y-1
              transition-all duration-300
            "
          >
            {/* Gradient depth layer */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${meta.accent} opacity-0 group-hover:opacity-100 transition`}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-4">
              {/* Icon + Count */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-black/30">
                  <Icon className="text-primaryBlue" size={28} />
                </div>
                <span className="text-4xl font-bold text-white">
                  {data[field] ?? 0}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {meta.label}
                </h3>
                <p className="text-white/60 text-sm mt-1 leading-snug">
                  {meta.tagline}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
