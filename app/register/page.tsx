"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: "CLIENTE" | "BUSINESS";
};

export default function Register() {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    role: "CLIENTE",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Row>
      <Col></Col>
      <Col>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirm-password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Check
              type="radio"
              label="Client"
              name="role"
              value="CLIENTE"
            />
            <Form.Check
              type="radio"
              label="Business"
              name="role"
              value="BUSINESS"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Toast bg="warning" show={!!error}>
          <Toast.Header>Error when Registering</Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
        <hr />
        <Link href="/login">Login to your account</Link>
      </Col>
      <Col></Col>
    </Row>
  );
}
