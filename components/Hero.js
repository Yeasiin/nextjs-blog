import Image from "next/image";
import classes from "./../styles/hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/yeasin.jpg" height={300} width={300} alt="" />
      </div>
      <h1>Hi, Iam Yeasin</h1>
      <p>
        Currently Working as Fullstack Developer (Remote) & I blog About Web
        Development & UI/UX,
      </p>
    </section>
  );
}

export default Hero;
