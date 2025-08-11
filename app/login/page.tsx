"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      redirect: false,
    });

    if (response?.error) {
      setError(response.error);
      return;
    }

    router.push("/");
  }

  return (
    <Row style={{ margin: 5 }}>
      <Col></Col>
      <Col>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <hr />
        <Link href="/register">Create a new account</Link>
        <br />
        <Link href="/">Visit the store as guest</Link>
        <Toast show={!!error} bg="danger">
          <Toast.Body style={{ color: "#fff" }}>{error}</Toast.Body>
        </Toast>
      </Col>
      <Col></Col>
    </Row>
  );
}
