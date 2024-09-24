import Button from "../Button/Button";
import styles from "./ContactForm.module.css";
import { MdMessage } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { HiMail } from "react-icons/hi";
import contactImage from '../../assets/images/call.png';


const ContactForm = () => {
  return (
    <section className={styles.contactContainer}>
      <div className={styles.contact_form}>
        <div className={styles.top_btn}>
          <Button
            text="VIA SUPPORT CHAT"
            icon={<MdMessage fontSize="24px" />}
          />
          <Button text="VIA CALL" icon={<IoIosCall fontSize="26px" />} />
        </div>
        <Button
          isOutline={true}
          text="VIA EMAIL FORM"
          icon={<HiMail fontSize="26px" />}
        />

        <form action="#">
          <div className={styles.form_fields}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div className={styles.form_fields}>
            <label htmlFor="mail">Email</label>
            <input type="mail" name="email" />
          </div>
          <div className={styles.form_fields}>
            <label htmlFor="Text">Message</label>
            <textarea name="text" rows="8" />
          </div>
          <div className={styles.submit_button_container}>
            <Button className={styles.submit_button} text="SUBMIT" />
          </div>
        </form>
      </div>
      <div className={styles.img_box}>
      <img src={contactImage} alt="Contact" />
      </div>
    </section>
  );
};

export default ContactForm;
