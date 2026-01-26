"use client";
import { getAllInstitutions } from "@/api/institutions/get-all-institutions";
import Filter from "@/component/general/Filter";
import { useEffect, useState } from "react";
import DashboardInfo from "./DashboardInfo";
import { Plus } from "lucide-react";
import InstitutionForm from "./InstitutionForm";
import { createInstitution } from "@/api/institutions/create-institution";
import toast from "react-hot-toast";

type V1VendorInstitutionsProps = {
  vendorId: string;
};

function V1VendorInstitutions({ vendorId }: V1VendorInstitutionsProps) {
  const [data, setData] = useState<any>([]);
  const [addNew, setAddNew] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    getAllInstitutions(setData);
  }, []);

  const handleCreateInstitution = async (data: any) => {
    try {
      await createInstitution(data);
      setAddNew(false);
      toast.success("Institute Created Successfully");
      getAllInstitutions(setData);
    } catch (err) {
      toast.error("Error creating Institute");
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      {addNew && (
        <InstitutionForm
          openForm={setAddNew}
          onSubmit={handleCreateInstitution}
        />
      )}

      <div className="w-full">
        <div className="w-full mb-5 flex justify-between">
          <h1 className="text-3xl ml-3 text-white/60">Manage Institutions</h1>
          <button
            onClick={() => setAddNew(true)}
            className="text-primaryBlue flex gap-2 border-primaryBlue border p-2 rounded-xl"
          >
            <Plus className="text-primaryBlue" />
            Add Institution
          </button>
        </div>
        <Filter data={data} setFilteredData={setFilteredData} />
        <DashboardInfo data={filteredData} />
      </div>
    </div>
  );
}

export default V1VendorInstitutions;
