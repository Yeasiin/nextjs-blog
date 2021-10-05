/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import classes from "./../styles/mainNavigation.module.css";
import logoClasses from "./../styles/logo.module.css";

function Navigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={logoClasses.logo}>Yeasin's Blog</div>
        </a>
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
