  "use client";

  import React, { useEffect, useState } from "react";
  import { useParams, useRouter } from "next/navigation";
  import styles from "@/app/products/[id]/page.module.scss";
  import RelatedProducts from "@/app/components/relatedProducts/page";
  import { useCart } from "@/app/components/cartContext/page";
  import { useWishlist } from "@/app/components/wishlistContext/page";
  import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
  import { useSession } from "next-auth/react";
  import { CartItem } from "@/app/components/cartContext/page";


  interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string[];
    sizes: string[];
    soldout: boolean;
    category: string;
    subCategory: string;
  }

  const ProductPage = () => {
    const { id } = useParams(); // Access to the specific id for the product
    const [product, setProduct] = useState<Product | null>(null); // Single product initialization. Is either null or an object
    const [selectedSize, setSelectedSize] = useState("S");
    const { addToCart, cart} = useCart();
    const { addToWishlist} = useWishlist();
    const {data: session} = useSession();
    const userId = session?.user?.id;


    const handleSizeChange = (size: string) => {
      setSelectedSize(size);
    };

    const handleAddToCart = async () => {
      
      console.log("Session in handleaddtocart:", session);

      
      
      if(product) {
        console.log("Adding product to cart:", {product})

        // Check if the product is already in the cart (with the same size)
      const existingItem = cart.find(
        (item: CartItem) => item._id === product._id && item.size === selectedSize
      );

      if(existingItem) {
        return
      }


        const newCartItem = {
          _id: product._id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          image: product.image[0],
          quantity: 1,
        };


        try {
          addToCart(newCartItem)

        if(session?.user?.id) {



          
            const response = await fetch("/api/cart", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                  cartItems: [newCartItem]
              }),
            })

            const data = await response.json();
            if(!response.ok) {
              console.error("Error adding to cart:", data.message);
            }
            }
        } catch (error) {
          console.error("Network error adding to cart:", error)
        }
        } 
        
      } 
    

    const handleAddToWishlist = () => {
      if(product) {
        addToWishlist({
          _id: product._id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          image: product.image[0],
        });
      }

    }

    useEffect(() => {
      if (id) {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
              throw new Error("Product not found");
            }
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
        fetchProduct();
      }
    }, [id]);

    return product ? (
      <div>
        <div className={styles.productSection}>
          <div className={styles.ImageSection}>
            {product.image.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={product.name}
                className={styles.productImage}
              />
            ))}
          </div>
          <div className={styles.mainSection}>
            <h2 className={styles.productName}>{product.name}</h2>
            <div className={styles.sizeSection}>
              <p className={styles.size}>
                Size <span className={styles.selectedSize}>{selectedSize}</span>
              </p>
              <div className={styles.buttonsContainer}>
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeChange(size)}
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.selectedSizeButton : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p className={styles.productPrice}>{product.price} kr</p>

            <div className={styles.buttonSection}>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to cart</button>
            <button className={styles.wishListButton} onClick={handleAddToWishlist}>
                  <HeartIcon className={styles.heartIcon} />
                </button>
            </div>
            <div className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>Description</h3>
              <p className={styles.description}>{product.description}</p>
            </div>
          </div>
        </div>

        <RelatedProducts
          category={product.category}
          subCategory={product.subCategory}
          currentProductId={product._id}
        />
      </div>
    ) : (
      <div>Loading...</div>
    );
  };

  export default ProductPage;
