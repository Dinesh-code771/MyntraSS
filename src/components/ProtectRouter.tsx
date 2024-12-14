import React, { Children } from 'react';
import Login from './Login';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProtectRouter({
  //here children = App component(props)
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <>{children}</> : <Login/>;
}

