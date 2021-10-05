import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import classes from "./../styles/contactForm.module.css";
import Notification from "./../components/Notification";

function Contact() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const buttonRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    setRequestStatus("pending");

    const bodyData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    buttonRef.current.textContent = "Sending...";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
      buttonRef.current.textContent = "Send Message";

      if (res.ok) {
        setRequestStatus("success");
      } else {
        res.statusText;
        throw new Error(res.statusText);
      }
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.message);
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending Message",
      message: "Your Message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  return (
    <>
      <Head>
        <title>Contact Page</title>
        <meta
          name="description"
          content="Feel Free to Contact me. I will response as soon as i can"
        />
      </Head>
      <section className={classes.contact}>
        <h1>How can i help you? </h1>
        <form onSubmit={handleForm} className={classes.form}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" ref={emailRef} id="email" required />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input type="text" ref={nameRef} id="name" required />
            </div>
            <div className={classes.control}>
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                ref={messageRef}
                id="message"
                rows="5"
                required
              ></textarea>
            </div>
          </div>
          <div className={classes.actions}>
            <button type="submit" ref={buttonRef}>
              Send Message
            </button>
          </div>
        </form>
        {requestStatus && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </section>
    </>
  );
}

export default Contact;
