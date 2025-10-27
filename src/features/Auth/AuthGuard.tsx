import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { SpinnerPage } from "../../Components/Layouts/SpinnerPage.tsx";
import { useQuery } from "@tanstack/react-query";
import { qo } from "../../Constants/QueryConstants/queries.ts";

export function AuthGuard() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery(qo.currentUser())

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    } else if (user && !user.currentCourseId) {
      navigate("/auth/courses")  
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return <SpinnerPage/>;

  return <Outlet />;
}