"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InstitutionInfo from "@/component/Institution-info/InstitutionInfo";
import { getInstituteData } from "@/api/institutions/get-institute-by-id";

export default function IndividualInstitution() {
  const queryParams = useParams();
  const institutionId = queryParams.institutionId as string;
  const [institution, setInstitution] = useState<any>(null);
  console.log(institutionId);
  useEffect(() => {
    if (!institutionId) return;
    getInstituteData(setInstitution, institutionId);
  }, [institutionId]);

  if (!institutionId) {
    return (
      <div className="p-6 text-gray-400">
        Institution ID is required. Please provide ?id=institutionId in the URL.
      </div>
    );
  }

  if (!institution) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return <InstitutionInfo institution={institution} />;
}
