"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useColors } from "@/component/general/(Color Manager)/useColors";
import { getVendorData } from "@/api/vendors/get-vendor-by-id";
import useVendor from "@/store/vendorStore";
import { getAllInstitutions } from "@/api/institutions/get-all-institutions";
import DashboardInfo from "@/component/AllInstitutions/v1/DashboardInfo";
import Filter from "@/component/general/Filter";


/* ---------------- TYPES ---------------- */

type StatsMap = Record<string, number>;

/*---------------- DUMMY DATA ------------ */

const DUMMY_VENDOR = {
  id: "demo-vendor-id",
  name: "Demo Vendor",
  email: "vendor@demo.com",
  tagline: "Building the future of education",
  phoneNumber: "9999999999",
  websiteLink: "https://example.com",
  address: "Demo Address",
  pincode: "000000",
};


type HeaderProps = {
  name: string;
  email: string;
  tagline?: string;
};

const Colors = useColors();

/* ---------------- HEADER ---------------- */
function Header({ name, email, tagline }: HeaderProps) {
  return (
    <div className="flex justify-between p-4">
      <div>
        <span className={`text-5xl ${Colors.text.special}`}>Greetings,</span>{" "}
        <span className={`text-5xl ${Colors.text.primary}`}>{name}</span>
        <div className="mt-2 text-lg">
          <span className={`${Colors.text.primary}`}>
            {tagline || "Welcome back to your dashboard"}
          </span>
        </div>
      </div>

      <div className="flex mr-11 items-center gap-6">
        <div className="p-6 bg-white rounded-full flex justify-center items-center">
          <User size={32} color="black" />
        </div>

        <div className="flex flex-col">
          <h1 className={`${Colors.text.primary} text-2xl font-semibold`}>
            {name}
          </h1>
          <p className={`${Colors.text.secondary}`}>{email}</p>
          {tagline && (
            <span className={`text-sm ${Colors.text.secondary} mt-1`}>{tagline}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- HERO SECTION ---------------- */

export default function HeroSection() {
  const [institutionData, setInstitutionData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);

  const vendor = useVendor((state) => state.info);
  console.log(vendor);
  const setVendor = useVendor((state) => state.setData);

  // FORCE UI TO WORK
  useEffect(() => {
    if (!vendor) {
      setVendor(DUMMY_VENDOR);
    }
  }, [vendor, setVendor]);

  // TRY REAL API (fails silently for now)
  useEffect(() => {
    if (!vendor?.id || vendor.id === "demo-vendor-id") return;
    getVendorData(null,vendor.id);
  }, [vendor?.id]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        await getAllInstitutions(setInstitutionData);
      } catch (err) {
        console.error("Error fetching institutions:", err);
      }
    };

    fetchInstitutions();
  }, []);


  if (!vendor) return null;

  return (
    <>
      <Header
        name={vendor.name}
        email={vendor.email}
        tagline={vendor.tagline}
      />

      <div className="p-10 mx-auto w-full h-fit flex flex-col">
        <h2 className={`text-2xl font-semibold mb-4 ${Colors.text.special}`}>Institutions</h2>
        <div className="flex flex-col gap-10">
        <Filter data={institutionData} setFilteredData={setFilteredData} />
        <DashboardInfo data={filteredData} />
        </div>
      </div>

    </>
  );
}