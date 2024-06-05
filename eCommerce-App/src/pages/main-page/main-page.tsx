import HeaderMainPage from '../../components/header-main-page/header-main-page';

const containerStyle: object = {
  textAlign: 'center',
  marginTop: 60,
};

function MainPage() {
  return (
    <>
      <HeaderMainPage />
      <p style={containerStyle}> The main page</p>
    </>
  );
}

export default MainPage;
