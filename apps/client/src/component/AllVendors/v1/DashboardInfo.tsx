"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Pencil, Trash2 } from "lucide-react";
import { deleteEntity, updateEntity } from "@/api/institutions/entity";

type CompanyData = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
};

type UpdatePayload = {
  entity: "vendor";
  data: CompanyData;
};

type DeletePayload = {
  entity: "vendor";
  id: string;
};

type Props = {
  data: CompanyData[];
  onUpdate: (payload: UpdatePayload) => void;
  onDelete: (payload: DeletePayload) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function formatValue(value: any) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string" && value.includes("T")) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date.toLocaleString();
  }
  return String(value);
}

export default function DashboardInfo({ data, onUpdate, onDelete }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<CompanyData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CompanyData | null>(null);

  const handleSeeDetails = (vendorId: string) => {
    router.push(`/admin-dashboard/vendors/${vendorId}`);
  };

  /* ------------------ HANDLERS ------------------ */

  const handleEdit = () => {
    if (!selected) return;
    setFormData(selected);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
  };

  const handleSubmit = async () => {
    if (!formData) return;
    await updateEntity(
      formData.id,
      {
        entity: "vendor",
        data: formData,
      },
      null,
    );

    setSelected(formData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteEntity(
      selected.id,
      {
        entity: "vendor",
        data: "",
      },
      null,
    );
    setSelected(null);
    setIsEditing(false);
  };

  const handleChange = (key: keyof CompanyData, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [key]: value });
  };

  /* ---------------------------------------------- */

  if (!data || data.length === 0) {
    return (
      <div className="py-12 my-12 text-center text-sm text-white/50">
        No companies found
      </div>
    );
  }

  return (
    <>
      {/* Table */}
      <div className="w-full overflow-y-auto border border-white/10 bg-divBg shadow-lg">
        <table className="w-full">
          <thead className="bg-black/30">
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-white/40">
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {data.map((company) => (
              <tr
                key={company.id}
                className="text-sm text-white transition hover:bg-primaryBlue/10"
              >
                <td className="px-6 py-4 font-medium">{company.name}</td>
                <td className="px-6 py-4 text-white/70">{company.email}</td>
                <td className="px-6 py-4 text-white/70">
                  {company.phoneNumber || "—"}
                </td>
                <td className="px-6 py-4 text-white/60">
                  {formatDate(company.createdAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSeeDetails(company.id)}
                    className="rounded-md border border-primaryBlue/40 px-3 py-1.5 text-xs font-medium text-primaryBlue transition hover:bg-primaryBlue/20"
                  >
                    See details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-divBg p-6 shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 text-white/50 hover:text-white transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6 mt-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Company Details
                </h2>
                <p className="mt-1 text-sm text-white/40">ID: {selected.id}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="rounded-md bg-primaryBlue px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="rounded-md border border-white/20 px-4 py-1.5 text-xs text-white/70 hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-1 rounded-md border border-primaryBlue/40 px-3 py-1.5 text-xs font-medium text-primaryBlue transition hover:bg-primaryBlue/20"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1 rounded-md border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {Object.entries(isEditing ? formData! : selected).map(
                ([key, value]) => {
                  const isReadonly =
                    key === "id" || key === "createdAt" || key === "updatedAt";

                  return (
                    <div key={key}>
                      <p className="mb-1 mt-2 text-[11px] uppercase tracking-wide text-primaryBlue">
                        {key.replace(/_/g, " ")}
                      </p>

                      {isEditing && !isReadonly ? (
                        <input
                          value={(formData as any)[key] ?? ""}
                          onChange={(e) =>
                            handleChange(
                              key as keyof CompanyData,
                              e.target.value,
                            )
                          }
                          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primaryBlue"
                        />
                      ) : (
                        <p className="break-words text-sm text-white">
                          {formatValue(value)}
                        </p>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
