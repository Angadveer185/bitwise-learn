"use client";

import { useEffect, useState } from "react";
import axiosInstance from "./axios";

export default function useLogs() {
    const [role, setRole] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axiosInstance.get("/api/logs");
                setRole(response.data.data);
                console.log(response.data);
            } catch (err: any) {
                setError(err?.message || "Failed to fetch role");
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, []);

    return { role, loading, error };
}
