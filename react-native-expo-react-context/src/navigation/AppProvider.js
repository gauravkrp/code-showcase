import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

import ApiRoutes from 'src/core/apiRoutes';
import { showToast } from 'src/components/Toast';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const org_code = 'SCI366';
const API = new ApiRoutes(org_code);

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [abcs, setabcs] = useState([]);
  const [Units, setUnits] = useState([]);
  const [Cases, setCases] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchDetails();
    })();
  }, [fetchDetails]);

  const fetchDetails = useCallback(async () => {
    try {
      const [abcsRes, unitsRes, casesRes] = await Promise.all([
        API.fetchAllabcProfile(),
        API.fetchAllfitnessUnits(),
        API.fetchAllPatientCases(),
      ]);
      // console.log('appContext', abcsRes, unitsRes, casesRes);
      if (abcsRes.api.responseCode === 2040 && abcsRes.result && abcsRes.result.length > 0) {
        setabcs(abcsRes.result);
      }
      if (unitsRes.api.responseCode === 2040 && unitsRes.result && unitsRes.result.length > 0) {
        setUnits(unitsRes.result);
      }
      if (casesRes.api.responseCode === 2040 && casesRes.result && casesRes.result.length > 0) {
        setCases(casesRes.result);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(`Error fetching details.`);
      console.log(error);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        abcs,
        Units,
        Cases,
        fetchDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
