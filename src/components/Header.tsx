import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";

const Header = () => {
  return (
    <header>
      {/* <Pattern /> */}
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
};

export default Header;
