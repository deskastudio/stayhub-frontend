import Button from './Button';

const GoogleLoginButton: React.FC = () => {
  return (
    <Button
      type='button'
      variant='secondary'
      onClick={() => console.log('Login with Google')}
    >
      <div className='flex items-center gap-3'>
        <img src='../public/icon/google_icon.svg' alt='Google icon' />
        Masuk Dengan Google
      </div>
    </Button>
  );
};

export default GoogleLoginButton;
