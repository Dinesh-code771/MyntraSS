import React, { Children } from 'react';
import Login from './Login';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './NavBar';
//when page is loading instead of showing empty page we are showing navBar[Loading...]symbol 

export default function ProtectRouter({
  //here children = App component(props)
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading)
    return (
      <div>
        <NavBar/> 
        <h1>Loading...</h1>
      </div>
    );
  return isAuthenticated ? <>{children}</> : <Login />;
}
