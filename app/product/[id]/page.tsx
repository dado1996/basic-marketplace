"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Product } from "@/interfaces/ProductInterface";
import Toast from "react-bootstrap/Toast";
import ButtonAddToCart from "@/components/ButtonAddToCart";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchProduct();

    async function fetchProduct() {
      try {
        const result = await fetch(`/api/product/${id}`);
        if (!result.ok) {
          setError("Error when fetching data");
          setProduct(null);
          return;
        }
        const retrievedProduct = await result.json();
        setProduct(retrievedProduct);
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      }
    }
  }, [id]);
  return (
    <Container fluid>
      {product && (
        <>
          <Row>
            <Col>
              <h1>{product.name}</h1>
            </Col>
          </Row>
          {product.img && (
            <Row>
              <Col>
                <Image src={product?.img ?? ""} alt={product?.name} />
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <b>{product.name}</b> - $ {product.price}
            </Col>
            <Col>{product.description}</Col>
          </Row>
          <Row>
            <Col>
              <ButtonAddToCart product={product} quantity={1} />
            </Col>
          </Row>
          <Toast show={!!error} bg="danger">
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </>
      )}
    </Container>
  );
}
