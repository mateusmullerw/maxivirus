import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";

const fakeUserDataInfected = {
  id: "1234",
  infected: true,
  gender: "female",
  name: {
    title: "Mrs",
    first: "Juliane",
    last: "da Mota",
  },
  location: {
    street: {
      number: 6095,
      name: "Rua São Pedro ",
    },
    city: "Serra",
    state: "Piauí",
    country: "Brazil",
    postcode: 99499,
  },
  email: "juliane.damota@example.com",
  dob: {
    date: "1950-06-03T18:02:15.147Z",
    age: 72,
  },
  registered: {
    date: "2018-06-15T20:07:47.138Z",
    age: 4,
  },
  phone: "(24) 7259-9413",
  cell: "(62) 3995-7097",
  picture: {
    large: "https://randomuser.me/api/portraits/women/84.jpg",
    medium: "https://randomuser.me/api/portraits/med/women/84.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/women/84.jpg",
  },
  nat: "BR",
};

const fakeUserDataSurvivor = {
  id: "5678",
  infected: false,
  gender: "male",
  name: {
    title: "Mr",
    first: "Damião",
    last: "da Mota",
  },
  location: {
    street: {
      number: 3898,
      name: "Rua Bela Vista ",
    },
    city: "Marília",
    state: "Bahia",
    country: "Brazil",
    postcode: 88362,
  },
  email: "damiao.damota@example.com",
  dob: {
    date: "1995-01-18T13:21:40.271Z",
    age: 27,
  },
  registered: {
    date: "2004-09-11T18:46:06.939Z",
    age: 18,
  },
  phone: "(81) 6580-2889",
  cell: "(63) 0689-1530",
  picture: {
    large: "https://randomuser.me/api/portraits/men/2.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/2.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/2.jpg",
  },
  nat: "BR",
};

  
describe("Test UserDetails modal", () => {
  const handleInfect = () => {};
  const handleClose = () => {};
  it("does NOT render the modal", () => {
    const open = false;
    render(
      <UserDetails
        handleInfect={handleInfect}
        open={open}
        handleClose={handleClose}
        userData={fakeUserDataInfected}
      />
    );
    expect(screen.queryByTestId("user-details")).not.toBeInTheDocument();
  });

  it("DOES render the modal with INFECTED info", () => {
    const { name, phone, email, registered, location } =
    fakeUserDataInfected;
    const open = true;
    render(
      <UserDetails
        handleInfect={handleInfect}
        open={open}
        handleClose={handleClose}
        userData={fakeUserDataInfected}
      />
    );
    expect(screen.queryByTestId("user-details")).toBeInTheDocument();

    const fullName = name.title + " " + name.first + " " + name.last;
    const nameInfo = screen.queryByTestId("name-info");
    expect(nameInfo).toBeInTheDocument();
    expect(nameInfo).toHaveTextContent(fullName);

    const infectedInfo = screen.queryByTestId("infected-info");
    expect(infectedInfo).toBeInTheDocument();
    expect(infectedInfo).toHaveTextContent("Infected");

    const phoneInfo = screen.queryByTestId("phone-info");
    expect(phoneInfo).toBeInTheDocument();
    expect(phoneInfo).toHaveTextContent(phone);

    const emailInfo = screen.queryByTestId("email-info");
    expect(emailInfo).toBeInTheDocument();
    expect(emailInfo).toHaveTextContent(email);

    const fullAddress =
    location.street.name +
    ", " +
    location.street.number +
    ", " +
    location.city +
    ", " +
    location.state +
    " - " +
    location.country;
    const addressInfo = screen.queryByTestId("address-info");
    expect(addressInfo).toBeInTheDocument();
    expect(addressInfo).toHaveTextContent(fullAddress);

    const infectedSince = screen.queryByTestId("infected-since");
    expect(infectedSince).toBeInTheDocument();
    expect(infectedSince).toHaveTextContent(`Infected ${new Date(registered.date).toDateString()}`);

    const infectedButton = screen.queryByTestId("infect-button");
    expect(infectedButton).not.toBeInTheDocument();

    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();
  });

  it("DOES render the modal with SURVIVOR info", () => {
    const { name, phone, email, registered, location } =
    fakeUserDataSurvivor;
    const open = true;
    render(
      <UserDetails
        handleInfect={handleInfect}
        open={open}
        handleClose={handleClose}
        userData={fakeUserDataSurvivor}
      />
    );
    expect(screen.queryByTestId("user-details")).toBeInTheDocument();

    const fullName = name.title + " " + name.first + " " + name.last;
    const nameInfo = screen.queryByTestId("name-info");
    expect(nameInfo).toBeInTheDocument();
    expect(nameInfo).toHaveTextContent(fullName);

    const infectedInfo = screen.queryByTestId("infected-info");
    expect(infectedInfo).toBeInTheDocument();
    expect(infectedInfo).toHaveTextContent("Survivor");

    const phoneInfo = screen.queryByTestId("phone-info");
    expect(phoneInfo).toBeInTheDocument();
    expect(phoneInfo).toHaveTextContent(phone);

    const emailInfo = screen.queryByTestId("email-info");
    expect(emailInfo).toBeInTheDocument();
    expect(emailInfo).toHaveTextContent(email);

    const fullAddress =
    location.street.name +
    ", " +
    location.street.number +
    ", " +
    location.city +
    ", " +
    location.state +
    " - " +
    location.country;
    const addressInfo = screen.queryByTestId("address-info");
    expect(addressInfo).toBeInTheDocument();
    expect(addressInfo).toHaveTextContent(fullAddress);

    const infectedSince = screen.queryByTestId("infected-since");
    expect(infectedSince).not.toBeInTheDocument();

    const infectedButton = screen.queryByTestId("infect-button");
    expect(infectedButton).toBeInTheDocument();
    expect(infectedButton).toHaveTextContent("Infect this person");

    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();

  });
});
