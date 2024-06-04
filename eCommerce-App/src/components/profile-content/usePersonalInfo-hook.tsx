import { useEffect, useState } from 'react';
import fetchPersonalData from '../../api/fetchPersonalData';

export interface PersonalData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
}

function UsePersonalInfo() {
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
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
          email: response.customer?.email,
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
