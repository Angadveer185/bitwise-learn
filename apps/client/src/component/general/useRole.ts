"use client";

import { useEffect, useState } from "react";

export type Role = "STUDENT" | "TEACHER" | "ADMIN" | "SUPERADMIN" | "INSTITUTION" | null;

const ROLE_STORAGE_KEY = "role";

export function useRole() {
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem(ROLE_STORAGE_KEY) as Role | null;

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return role?.toLowerCase() || null;
}
