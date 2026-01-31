// Do optimization in Version 2 - Aayush Vats

"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useColors } from "@/component/general/(Color Manager)/useColors";
import { useTeacher } from "@/store/teacherStore";
import { getAllBatches } from "@/api/batches/get-all-batches";
import DashboardInfo from "@/component/AllBatches/v1/DashboardInfo";
import Filter from "@/component/general/Filter";

/* ---------------- HEADER ---------------- */

function Header() {
  const Colors = useColors();
  const teacher = useTeacher();

  if (!teacher.info) return null;

  const { name, email } = teacher.info.data;
  return (
    <div className="flex justify-between p-4">
      {/* Greeting */}
      <div>
        <h1 className="text-5xl font-semibold">
          <span className={Colors.text.special}>Greetings, </span>
          <span className={Colors.text.primary}>{name}</span>
        </h1>

        <p className={`mt-2 text-lg ${Colors.text.primary}`}>
          Enjoy managing{" "}
          <span className={Colors.text.special}>Bitwise Learn</span>
        </p>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="p-6 rounded-full bg-white flex items-center justify-center">
          <User size={32} />
        </div>

        <div className="leading-tight">
          <p className={`text-2xl ${Colors.text.primary}`}>{name}</p>
          <p className={Colors.text.secondary}>{email}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HERO SECTION ---------------- */

export default function HeroSection() {
  const teacher = useTeacher();
  const Colors = useColors();

  const institutionId = teacher.info?.data.institution.id;
  const [batches, setBatches] = useState<any[]>([]);
  const [filteredBatches, setFilteredBatches] = useState<any[]>([]);

  useEffect(() => {
    if (!institutionId) return;

    getAllBatches(setBatches, institutionId);
  }, [institutionId]);

  return (
    <div className="space-y-8">
      <Header />

      <div className="flex flex-col gap-10 px-4">
        <div className="flex flex-col gap-3">
        <h1 className={`${Colors.text.special} text-3xl font-semibold`}>Batches</h1>
        <Filter data={batches} setFilteredData={setFilteredBatches} />
        </div>
        <DashboardInfo data={filteredBatches} />
      </div>
    </div>
  );
}
