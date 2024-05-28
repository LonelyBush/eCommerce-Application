import { useEffect, useState } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import fetchPersonalData from '../../api/fetchPersonalData';

interface PersonalData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: BaseAddress[];
}

function UsePersonalInfo() {
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: [],
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
          addresses: response.customer?.addresses,
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
