import "./ContactPage.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactHeader from "./components/ContactHeader/ContactHeader";
import Navigation from "./components/Navigationbar/Navigation";
import leftImage from "./assets/images/get-with-us.png";

function ContactPage() {
  return (
    <div className="contact_us_container">
      <Navigation />
      <main className="main_contact-us_container">
        <div className="left_image_container">
          <img src={leftImage} alt="Left-side illustration" />
        </div>
        <ContactHeader />
        <div className="text-white text-center ">
          <p className="font-bold">CONTACT US</p>
        </div>
        <ContactForm />
      </main>
    </div>
  );
}

export default ContactPage;
