
import Button from './Button';

const ForgotPasswordLink: React.FC = () => {
  return (
    <div className="flex justify-end items-center mt-2">
      <Button type="button" variant="underlined" onClick={() => console.log('Lupa Password')}>
        Lupa Password?
      </Button>
    </div>
  );
};

export default ForgotPasswordLink;
