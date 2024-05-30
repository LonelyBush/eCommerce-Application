import { useEffect, useState } from 'react';
import fetchPersonalData from '../../api/fetchPersonalData';

export interface PersonalData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

function UsePersonalInfo() {
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });
  useEffect(() => {
    async function getResponse() {
      try {
        const response = await fetchPersonalData(
          localStorage.getItem('personal-id')!,
        );
        setPersonalData({
          ...personalData,
          firstName: response.customer?.firstName,
          lastName: response.customer?.lastName,
          dateOfBirth: response.customer?.dateOfBirth,
        });
      } catch (caughtError) {
        if (caughtError instanceof Error) {
          console.log(caughtError.message);
        }
      }
    }
    getResponse();
  }, []);
  return personalData;
}

export default UsePersonalInfo;
