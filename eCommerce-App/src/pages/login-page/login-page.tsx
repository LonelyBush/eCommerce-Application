import { useState, useEffect } from 'react';
import getProject from '../../api/api-client';
import LoginForm from '../../components/login-form/login-form';

interface Project {
  key: string;
  name: string;
  currencies: string[];
}

// here i created an example of fetching project api data;

function LoginPage() {
  const [response, setResponse] = useState<Project>();
  useEffect(() => {
    getProject()
      .then(({ body }) => setResponse(body))
      .catch(console.error);
  }, []);
  return (
    <div>
      <LoginForm />
      <div>
        <p>
          Test for fetching data using TS SDK below will deploy main API data
        </p>
        <div style={{ border: '1px solid black' }}>
          <p>{`Commercetools project name: ${response?.name}`}</p>
          <p>{`Main Key: ${response?.key}`}</p>
          <p>Currencies of the project:</p>
          <ul>
            {response?.currencies.map((elem, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <li key={index}>{elem}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
