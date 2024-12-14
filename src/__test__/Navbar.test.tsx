import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Navbar from "../components/Layouts/Navbar";

describe("Navbar Component", () => {
  // Setup function
  const setup = () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  };

  it("should render the logo and buttons", () => {
    setup();

    // Check for logo
    expect(screen.getByAltText("StayHub Logo")).toBeInTheDocument();

    // Check for buttons (Login and Register)
    const loginButtons = screen.getAllByText("Masuk");
    const registerButtons = screen.getAllByText("Daftar");

    // Ensure at least one button for each is in the document
    expect(loginButtons.length).toBeGreaterThan(0);
    expect(registerButtons.length).toBeGreaterThan(0);
  });

  it('toggles the menu when the toggle button is clicked', () => {
    setup();
    const button = screen.getByRole('button', { name: /Toggle menu/i });
    expect(button).toBeInTheDocument();
  
    // Menu should be hidden initially
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('hidden');
  
    // Click to open the menu
    fireEvent.click(button);
    expect(nav).toHaveClass('block');
  
    // Click again to close the menu
    fireEvent.click(button);
    expect(nav).toHaveClass('hidden');
  });

  it('closes the menu when a navigation item is clicked', () => {
    setup();
    const button = screen.getByRole('button', { name: /Toggle menu/i });
    expect(button).toBeInTheDocument();
  
    // Click to open the menu
    fireEvent.click(button);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('block');
  
    // Simulate clicking a navigation item to close the menu
    fireEvent.click(screen.getByText("Beranda")); // Example navigation item
    expect(nav).toHaveClass('hidden');
  });

  it("should display the menu on large screens without toggle functionality", () => {
    // Set window width to a large screen size
    global.innerWidth = 1024;

    setup();

    // Navigation items should be visible by default
    expect(screen.getByText("Beranda")).toBeVisible();
    expect(screen.getByText("Tentang Kami")).toBeVisible();
    expect(screen.getByText("Booking")).toBeVisible();
    expect(screen.getByText("Kontak")).toBeVisible();
  });
});
