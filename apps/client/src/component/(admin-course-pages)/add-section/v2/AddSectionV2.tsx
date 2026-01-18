"use client";

type Props = {
  sectionNumber: number;
  sectionData: {
    id: string;
    name: string;
  };
};

const AddSectionV2 = ({ sectionNumber, sectionData }: Props) => {
  return (
    <div className="text-white bg-divBg rounded-2xl px-6 py-4 border border-white/10">
      <h2 className="text-lg font-semibold">
        Section {sectionNumber}: {sectionData.name}
      </h2>
    </div>
  );
};

export default AddSectionV2;
