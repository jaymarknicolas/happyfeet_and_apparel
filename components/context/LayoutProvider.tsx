"use client";
import React, { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { api } from "@/lib/axios";
import { UserActivityLogFormatted } from "@/prisma/type";

interface LayoutContextProps {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
  user: Session | null;
  setUser: (user: Session | null) => void;
  activities: UserActivityLogFormatted[]; // Store activity in the context
  saveActivity: (action: string, details: string) => void; // Function to save activity
}

interface Session {
  user: {
    id: string;
    token: string;
    uuid: string;
    role: string;
    name: string;
    email: string;
  };
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

const LayoutProvider: React.FC<{
  session?: Session | null;
  children: ReactNode;
}> = ({ session, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [user, setUser] = useState<Session | null>(null);
  const [activities, setActivities] = useState<UserActivityLogFormatted[]>([]);

  // const pathname = usePathname();
  const toggleSideBar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const fetchActivities = async () => {
    try {
      const response = await api.get("/recent-activity"); // Replace with actual endpoint
      setActivities(response.data.data);
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    if (session) {
      setUser(session);
      fetchActivities();
    }
  }, [session]);

  // Function to save activity and optionally send it to the backend
  const saveActivity = async (action: string, details: string) => {
    if (user) {
      try {
        const response = await api.post("/recent-activity", {
          user_id: user.user.id,
          action,
          details,
        });

        if (response.status === 201) {
          fetchActivities();
        } else {
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error adding brand:", error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      }
    }
  };

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSideBar,
        user,
        setUser,
        activities,
        saveActivity,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
