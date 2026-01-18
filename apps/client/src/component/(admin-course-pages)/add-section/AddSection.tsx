"use client";

import AddSectionV2 from "./v2/AddSectionV2";

type Props = {
  sectionNumber: number;
  sectionData: any;
};

const AddSection = ({ sectionNumber, sectionData }: Props) => {
  return (
    <AddSectionV2
      sectionNumber={sectionNumber}
      sectionData={sectionData}
    />
  );
};

export default AddSection;
