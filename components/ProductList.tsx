import { Product } from "@/interfaces/ProductInterface";
import Card from "react-bootstrap/Card";
import styles from "./ProductList.module.css";
import Link from "next/link";
import ButtonAddToCart from "./ButtonAddToCart";

export default function ProductList({ products }: { products: Product[] }) {
  console.log(products);
  return (
    <div className={styles.product_list}>
      {products.map((p) => (
        <Card key={p.id} className={styles.product_card}>
          <Link href={`/product/${p.id}`}>
            <Card.Img src={p.img} alt={p.name} />
          </Link>
          <Card.Body>
            <Card.Title>{p.name}</Card.Title>
            <Card.Text>
              $ {p.price} - {p.description}
            </Card.Text>
            <ButtonAddToCart product={p} quantity={1} />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
