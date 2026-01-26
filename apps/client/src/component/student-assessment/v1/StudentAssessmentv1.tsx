"use client";

// imports -----------------------------------------------------------------
import { useEffect, useState } from "react";
import { Search, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getAllAssessments } from "@/api/assessments/get-all-assessments";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


// colors ------------------------------------------------------------------
const colors = {
    primary_Bg: "bg-[#121313]",
    secondary_Bg: "bg-[#1E1E1E]",
    special_Bg: "bg-[#64ACFF]",
    primary_Hero: "bg-[#129274]",
    primary_Font: "text-white",
    secondary_Font: "text-white/60",
    border: "border border-white/10",
};

// types -------------------------------------------------------------------
type StudentAssessment = {
    id: string;
    name: string;
    description: string;
    instructions: string;
    startTime: string;
    endTime: string;
    individualSectionTimeLimit?: number;
    status?: "UPCOMING" | "LIVE" | "ENDED";
    batchId: string;
};

// -------------------------------------------------------------------------
// Assessment Card
// -------------------------------------------------------------------------
const AssessmentCard = ({
    assessment,
    onAttempt,
}: {
    assessment: StudentAssessment;
    onAttempt: (assessment: StudentAssessment) => void;
}) => {
    const statusStyles =
        "bg-green-500/10 text-green-400 border border-green-500/30";

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="
        rounded-2xl p-5 flex flex-col gap-4
        bg-linear-to-br from-[#1E1E1E] to-[#151515]
        border border-white/10
        shadow-lg shadow-black/30
        hover:border-[#64ACFF]/40
        transition
      "
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white leading-tight">
                    {assessment.name}
                </h3>

                {assessment.status && (
                    <span className={`text-xs px-3 py-1 rounded-full ${statusStyles}`}>
                        {assessment.status}
                    </span>
                )}
            </div>

            <p className="text-sm leading-relaxed text-white/60">
                {assessment.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-white/50">
                <Clock size={14} />
                <span>
                    {new Date(assessment.startTime).toLocaleString()} —{" "}
                    {new Date(assessment.endTime).toLocaleString()}
                </span>
            </div>

            <button
                onClick={() => onAttempt(assessment)}
                className="
          mt-auto w-full rounded-lg py-2.5 text-sm font-semibold
          bg-linear-to-r from-primary-hero to-[#0f7e65]
          text-white
          hover:opacity-90
          hover:shadow-md hover:shadow-primary-hero/30
          transition
        "
            >
                Attempt Assessment
            </button>
        </motion.div>
    );
};

// -------------------------------------------------------------------------
// Instructions Modal
// -------------------------------------------------------------------------
const InstructionsModal = ({
    assessment,
    onClose,
    onStart,
}: {
    assessment: StudentAssessment;
    onClose: () => void;
    onStart: () => void;
}) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="
          w-full max-w-lg rounded-2xl p-6
          bg-linear-to-br from-[#1E1E1E] to-[#141414]
          border border-white/10
          shadow-xl shadow-black/40
        "
            >
                <h2 className="text-xl font-semibold text-white">
                    {assessment.name}
                </h2>

                <p className="mt-2 text-sm text-white/60">
                    {assessment.description}
                </p>

                <div className="mt-4 max-h-60 overflow-y-auto pr-2">
                    <h4 className="text-sm font-semibold text-white mb-2">
                        Instructions
                    </h4>

                    <p className="text-sm text-white/60 whitespace-pre-line">
                        {assessment.instructions?.trim()
                            ? assessment.instructions
                            : "No instructions provided for this assessment."}
                    </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm text-white/60 hover:text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onStart}
                        className="
              rounded-md px-4 py-2 text-sm font-semibold
              bg-primary-hero text-white
              hover:opacity-90 transition
            "
                    >
                        Start Assessment
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// -------------------------------------------------------------------------
// Skeleton Card
// -------------------------------------------------------------------------
const AssessmentSkeleton = () => (
    <div
        className="
      rounded-2xl p-5 flex flex-col gap-4
      bg-[#1E1E1E]
      border border-white/10
      animate-pulse
    "
    >
        <div className="flex justify-between gap-4">
            <div className="h-5 w-2/3 rounded bg-white/10" />
            <div className="h-5 w-16 rounded bg-white/10" />
        </div>

        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-5/6 rounded bg-white/10" />

        <div className="h-3 w-3/4 rounded bg-white/10" />

        <div className="h-9 w-full rounded bg-white/10 mt-auto" />
    </div>
);

// -------------------------------------------------------------------------
// Main Component
// -------------------------------------------------------------------------
const StudentAssesmentv1 = () => {
    const [assessments, setAssessments] = useState<StudentAssessment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedAssessment, setSelectedAssessment] =
        useState<StudentAssessment | null>(null);
        

    const fetchAssessments = async () => {
        try {
            setLoading(true);
            const res = await getAllAssessments();

            const normalizedData = (res.data || []).map((a: any) => ({
                ...a,
                instructions: a.instruction,
            }));

            setAssessments(normalizedData);
        } catch (error) {
            console.log("Fetching Error: ", error);
            toast.error("Failed to load Assessments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssessments();
    }, []);

    const liveAssessments = assessments.filter(
        (assessment) => assessment.status === "LIVE"
    );

    const filteredAssessments = liveAssessments.filter((assessment) => {
        if (!searchText.trim()) return true;

        const query = searchText.toLowerCase();

        return (
            assessment.name.toLowerCase().includes(query) ||
            assessment.description.toLowerCase().includes(query)
        );
    });

    const router = useRouter();

    return (
        <section className="flex w-full flex-col gap-8 p-6">
            {/* Search */}
            <div className="flex flex-col gap-2 max-w-md">
                <div className="relative w-full">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                    />
                    <input
                        type="text"
                        placeholder="Search live assessments..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="
              w-full rounded-lg pl-10 pr-4 py-2.5 text-sm
              bg-[#1A1A1A] text-white
              border border-white/10
              placeholder:text-white/30
              focus:border-[#64ACFF]/60
              focus:ring-1 focus:ring-[#64ACFF]/30
              transition
            "
                    />
                </div>

                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Your Assessments
                </h1>
                {/* Helper text BELOW search */}
                <p className="text-xs text-white/40 tracking-wide">
                    View and attempt live assessments assigned to you
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <AssessmentSkeleton key={i} />
                    ))
                    : filteredAssessments.length > 0
                        ? filteredAssessments.map((assessment) => (
                            <AssessmentCard
                                key={assessment.id}
                                assessment={assessment}
                                onAttempt={setSelectedAssessment}
                            />
                        ))
                        : (
                            <p className="col-span-full text-center text-sm text-white/50 py-12">
                                🚫 No live assessments available right now.
                            </p>
                        )}
            </div>

            {selectedAssessment && (
                <InstructionsModal
                    assessment={selectedAssessment}
                    onClose={() => setSelectedAssessment(null)}
                    onStart={() => {
                        setSelectedAssessment(null);
                        router.push(`/assessments/${selectedAssessment.id}`)
                    }}
                />
            )}
        </section>
    );
};

export default StudentAssesmentv1;
