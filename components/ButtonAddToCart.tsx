import { useCart } from "@/context/CartContext";
import { Product } from "@/interfaces/ProductInterface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

type Props = {
  product: Product;
  quantity: number;
};

export default function ButtonAddToCart({ product, quantity }: Props) {
  const { addItem } = useCart();
  const { data } = useSession();
  const router = useRouter();

  function handleAddCart(product: Product) {
    if (data?.user.role !== "CLIENTE") {
      router.replace("/login");
      return;
    }

    addItem(product, quantity);
  }

  return (
    <Button
      type="button"
      variant="primary"
      onClick={() => handleAddCart(product)}
    >
      Add to cart
    </Button>
  );
}
