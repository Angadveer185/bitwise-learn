import PublishCourseV1 from "./v1/PublishCourseV1";

export type Requirement = {
  label: string;
  satisfied: boolean;
};

export type PublishCourseProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  requirements: Requirement[];
};

const PublishCourse = ({
  open,
  onClose,
  onConfirm,
  requirements,
}: PublishCourseProps) => {
  return (
    <PublishCourseV1
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      requirements={requirements}
    />
  );
};

export default PublishCourse;
