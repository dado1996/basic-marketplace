"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./UserDropDown.module.css";

export default function UserDropdown() {
  const session = useSession();
  console.log(session.data);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">
        {session.data?.user?.name || "User"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {session.status === "authenticated" ? (
          <>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => signOut()}>Logout</Dropdown.Item>
          </>
        ) : (
          <>
            <Link className={styles.link} href={"/login"}>
              Login
            </Link>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
