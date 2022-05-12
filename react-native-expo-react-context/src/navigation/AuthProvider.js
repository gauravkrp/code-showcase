import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import { save, getValueFor, deleteValueFor } from 'src/core/useDeviceStorage';
import ApiRoutes from 'src/core/apiRoutes';
import { setAuthToken } from '../../axios.config';
import { showToast } from 'src/components/Toast';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const org_code = 'SCI366';
const API = new ApiRoutes(org_code);

export const AuthProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [orgCode, setOrgCode] = useState(org_code);
  const [organization, setOrganization] = useState(null);

  /* Runs on component mounting and checks for token in local storage */
  useEffect(() => {
    (async() => {
      setOrgCode(org_code);
      const authToken = await getValueFor('authToken');
      if (authToken) {
        setToken(authToken);
        setAuthToken(authToken);
      } else {
        setInitializing(false);
      }
    })();
  }, []);

  /* fetch abc Profile & organization details when token is present. */
  useEffect(() => {
    (async () => {
      if (token) {
        setInitializing(true);
        await fetchProfileAndOrganization();
      }
    })();
  }, [token, fetchProfileAndOrganization]);

  const fetchProfileAndOrganization = useCallback(async () => {
    try {
      const [orgRes, profileRes] = await Promise.all([API.fetchOrganizationDetails(), API.fetchabcSelfProfile()]);
      if (orgRes.api && profileRes.api) {
        if (orgRes.api.responseCode === 2040 && profileRes.api.responseCode === 2040) {
          setOrganization(orgRes.result);
          setUser(profileRes.result);
          setLoggedIn(true);
        } else {
          switch (profileRes.api.responseCode) {
            case 4150:
              showToast(`Please log in to continue.`);
              break;
            case 3410:
              showToast(`Profile not found! Please contact your organization admin.`);
              break;
            case 5190:
              showToast(`Error fetching profile details.`);
              break;

            default:
              showToast(`Error fetching profile details.`);
              console.log('response', orgRes, profileRes);
              break;
          }
        }
      } else {
        showToast(`Error fetching profile details.`);
        console.log('response', orgRes, profileRes);
      }
      setInitializing(false);
    } catch (error) {
      setInitializing(false);
      showToast(`Error fetching your profile and organization details.`);
      console.log(error);
    }
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        initializing,
        loggedIn,
        orgCode,
        organization,
        fetchProfileAndOrganization,
        setAuth: async (token) => {
          setInitializing(true);
          await save('authToken', token);
          setToken(token);
          setAuthToken(token);
          setInitializing(false);
        },
        logout: async () => {
          try {
            setInitializing(true);
            showToast('Logged out! Please log in again to use the app.');
            await deleteValueFor('authToken');
            setToken(null);
            setAuthToken();
            setLoggedIn(false);
            setInitializing(false);
          } catch (e) {
            setToken(null);
            setAuthToken();
            setInitializing(false);
            showToast('Unable to log you out!');
            console.error(e);
            setLoggedIn(false);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
