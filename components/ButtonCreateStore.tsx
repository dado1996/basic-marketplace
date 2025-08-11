import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ButtonCreateStore() {
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = await fetch("/api/store", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      setModalShow(false);
      return;
    }
  }

  return (
    <>
      <Button
        variant="primary"
        type="button"
        onClick={() => setModalShow(true)}
      >
        Create New Store
      </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>Create Product</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Button type="submit">Create Store</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
