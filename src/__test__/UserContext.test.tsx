import { render, screen, fireEvent } from '@testing-library/react';
import { UserProvider, useUser } from '../contexts/UserContext'; // Sesuaikan pathnya dengan struktur folder Anda

// Komponen sementara untuk menguji UserContext
const TestComponent = () => {
  const { userType, setUserType } = useUser();
  
  return (
    <div>
      <span data-testid="user-type">{userType}</span>
      <button onClick={() => setUserType('admin')}>Change to Admin</button>
    </div>
  );
};

describe('UserContext', () => {
  // Test 1: Memastikan konteks memberikan nilai yang benar
  it('should provide the correct initial userType value', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const userTypeElement = screen.getByTestId('user-type');
    expect(userTypeElement).toHaveTextContent('user');
  });

  // Test 2: Memastikan setUserType berfungsi untuk memperbarui nilai
  it('should update userType when setUserType is called', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const button = screen.getByText('Change to Admin');
    fireEvent.click(button);

    const userTypeElement = screen.getByTestId('user-type');
    expect(userTypeElement).toHaveTextContent('admin');
  });
});
