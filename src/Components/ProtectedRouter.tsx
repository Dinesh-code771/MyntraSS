import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Login from "./Login";

export default function ProtectedRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("isAthenticated", isAuthenticated, isLoading);
  if (isLoading) return <div>Loading..</div>;
  // return isAuthenticated && !isLoading ? children : <Login />;
  return isAuthenticated ? <>{children}</> : <Login />;
}

//   const { isAuthenticated,isLoading } = useAuth0();
// if (isLoading) return <div>Loading..</div>
//   return isAuthenticated && !isLoading ? children : <Login />;
// }
