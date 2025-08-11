"use client";

import { useCart } from "@/context/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { status } = useSession();
  const { items, removeItem, clearCart, totalPrice, itemCount } = useCart();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.replace("/login");
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Checkout</h1>
          {itemCount > 0 ? (
            <ListGroup>
              {items.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div>
                    <b>{item.name}</b> - $ {item.price}
                    <Badge bg="primary" pill>
                      {item.quantity}
                    </Badge>
                  </div>
                  <div>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => removeItem(item.id!)}
                    >
                      X
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No items in the cart</p>
          )}
        </Col>
        <Col style={{ display: itemCount === 0 ? "none" : "block" }}>
          <p>Total price: $ {totalPrice}</p>
          <Button variant="primary" type="button" onClick={clearCart}>
            Clear Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
