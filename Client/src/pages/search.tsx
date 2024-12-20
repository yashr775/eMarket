/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { CartItem } from "../types/types";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";

// const categoriesResponse = {
//   categories: ["electronics", "fashion", "home", "beauty", "sports"],
// };

// const searchedData = {
//   products: [
//     {
//       _id: "1",
//       name: "Smartphone",
//       price: 500,
//       stock: 20,
//       photos: [{ url: "https://via.placeholder.com/150", public_id: "image1" }],
//     },
//     {
//       _id: "2",
//       name: "Headphones",
//       price: 150,
//       stock: 15,
//       photos: ["https://via.placeholder.com/150"],
//     },
//     {
//       _id: "3",
//       name: "Blender",
//       price: 75,
//       stock: 10,
//       photos: ["https://via.placeholder.com/150"],
//     },
//     {
//       _id: "4",
//       name: "Running Shoes",
//       price: 100,
//       stock: 25,
//       photos: ["https://via.placeholder.com/150"],
//     },
//     {
//       _id: "5",
//       name: "Lipstick",
//       price: 20,
//       stock: 50,
//       photos: ["https://via.placeholder.com/150"],
//     },
//   ],
//   totalPage: 4,
// };

const search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery();
  console.log(categoriesResponse?.categories);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem) => {
    console.log(cartItem);
    return "dfdsffsdf";
  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {searchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
              />
            ))}
          </div>
        )}

        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default search;
