import { useEffect, useState } from "react";
import { Pencil, Save, X, Trash } from "lucide-react";
import InfoBlock from "./InfoBlock";
import { deleteEntity, updateEntity } from "@/api/institutions/entity";

type VendorSidebarProps = {
  vendor: any;
  onUpdate?: (data: any) => void;
  onDelete?: (id: string) => void;
};

const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number): string => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1">
    <label className="text-xs text-gray-400">{label}</label>
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const VendorSidebar = ({
  vendor,
  onUpdate,
  onDelete,
}: VendorSidebarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(vendor);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++=")
  console.log(vendor.name);
  useEffect(() => {
    setFormData(vendor);
  }, [vendor]);

  const formattedDate = vendor.createdAt
    ? formatDate(vendor.createdAt)
    : "";

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    await updateEntity(
      formData.id,
      {
        entity: "vendor",
        data: formData,
      },
      null,
    );
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      await deleteEntity(
        formData.id,
        {
          entity: "vendor",
          data: "",
        },
        null,
      );
    }
  };

  return (
    <aside className="w-[320px] bg-[#1b1b1b] text-white p-6 rounded-xl min-h-[93vh]">
      {/* Header */}
      <div className="mb-4">
        {isEditing ? (
          <InputField
            label="Institution Name"
            value={formData.name}
            onChange={(v) => handleChange("name", v)}
          />
        ) : (
          <h1 className="text-2xl font-semibold">{vendor.name}</h1>
        )}
      </div>
      {isEditing ? (
        <>
          <textarea
            name="tagline"
            value={formData.tagline || ""}
            onChange={(e) => handleChange("tagline", e.target.value)}
            placeholder="Enter tagline"
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </>
      ) : (
        <p className="text-sm text-gray-400 mb-6">{vendor.tagline || "—"}</p>
      )}

      {/* Content */}
      <div className="space-y-4 text-sm mt-6">
        {isEditing ? (
          <>
            <InputField
              label="Website Link"
              value={formData.websiteLink || ""}
              onChange={(v) => handleChange("websiteLink", v)}
            />
            <InputField
              label="Email"
              value={formData.email || ""}
              onChange={(v) => handleChange("email", v)}
            />
            <InputField
              label="Contact Number"
              value={formData.phoneNumber || ""}
              onChange={(v) => handleChange("phoneNumber", v)}
            />

            <InfoBlock label="Member Since" value={formattedDate} />
          </>
        ) : (
          <>
            <InfoBlock label="Website Link" value={vendor.websiteLink || "—"} />
            <InfoBlock label="Email" value={vendor.email || "—"} />
            <InfoBlock label="Contact number" value={vendor.phoneNumber || "—"} />
            <InfoBlock label="Member Since" value={formattedDate} />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              <X size={16} />
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              <Pencil size={16} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 text-white border border-white px-4 py-2 rounded"
            >
              <Trash size={16} />
              Delete
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default VendorSidebar;
