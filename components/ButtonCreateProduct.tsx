import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Store } from "@/interfaces/StoreIntarface";
import { Product } from "@/interfaces/ProductInterface";

export default function ButtonCreateProduct() {
  const [modalShow, setModalShow] = useState(false);
  const [userStores, setUserStores] = useState<Store[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    img: "",
    storeId: 0,
  });

  useEffect(() => {
    getUserStores();

    async function getUserStores() {
      const result = await fetch("/api/user/stores");

      if (!result.ok) {
        setUserStores([]);
        return;
      }

      setUserStores(await result.json());
    }
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
    console.log(newProduct);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        ...newProduct,
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
        Create New Product
      </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>Create Product</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="url" name="img" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Store</Form.Label>
              <Form.Select name="storeId" onChange={handleChange}>
                <option>Select a store...</option>
                {userStores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit">Create Product</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
