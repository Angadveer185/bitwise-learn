import React from 'react'
import StudentAssessment from '@/component/student-assessment/StudentAssessment'
import StudentSideBar from '@/component/general/StudentSidebar'
const page = () => {
  return (
    <div className="flex h-screen overflow-hidden ">
      <StudentSideBar />
      <main className="flex-1 overflow-y-auto px-10 py-10">
        <StudentAssessment />
      </main>
    </div>
  )
}

export default page