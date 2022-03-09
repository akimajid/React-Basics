import {
    Box,
    Text,
    Input,
    Center,
    FormLabel,
    Flex,
    Button,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { axiosInstance } from "../configs/api";
  
  const ProductCard = ({ productName, price, category }) => {
    return (
      <Box
        margin="2"
        borderWidth={1}
        borderColor="gray"
        borderRadius="4px"
        width="150px"
        padding="4"
      >
        <Text fontSize="large" fontWeight="bold">
          {productName}
        </Text>
        <Text>Rp. {price}</Text>
        <Text>{category}</Text>
      </Box>
    );
  };
  
  const ProductPage = () => {
    const [productList, setProductList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchValue, setSearchValue] = useState("");
  
    const [currentPage, setCurrentPage] = useState(1);
  
    const pageLimit = 3;
  
    const inputHandler = (event) => {
      const { value } = event.target;
  
      setSearchInput(value);
    };
  
    const fetchProducts = (
      queryParams = {
        params: {
          _limit: pageLimit,
        },
      }
    ) => {
      axiosInstance
        .get("/product", queryParams)
        .then((res) => {
          setProductList(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Terjadi kesalahan di server");
        });
    };
  
    const renderProducts = () => {
      return productList.map((val) => {
        return (
          <ProductCard
            category={val.category}
            price={val.price}
            productName={val.product_name}
          />
        );
      });
    };
  
    const searchButtonHandler = () => {
      setSearchValue(searchInput);
      setCurrentPage(1)
      if (searchInput) {
        fetchProducts({
          params: {
            product_name: searchInput,
          },
        });
      } else {
        fetchProducts();
      }
    };
  
    const paginationHandler = (direction = "next") => {
      let newPage = currentPage;
  
      if (direction === "prev" && currentPage === 1) {
        return;
      }
  
      if (direction === "next") {
        newPage += 1;
      } else if (direction === "prev") {
        newPage -= 1;
      }
  
      setCurrentPage(newPage);
  
      fetchProducts({
        params: {
          _limit: pageLimit,
          _page: newPage,
          product_name: searchValue ? searchValue : undefined,
        },
      });
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    return (
      <Center>
        <Box width="xl">
          <Text fontSize="2xl" marginBottom="8">
            Products Page
          </Text>
  
          <FormLabel htmlFor="searchProduct">Product Name</FormLabel>
          <Input onChange={inputHandler} id="searchProduct" />
          <Button onClick={searchButtonHandler} marginTop="1">
            Search
          </Button>
  
          <Flex wrap="wrap" marginTop="4" justifyContent="center">
            {renderProducts()}
          </Flex>
  
          <Flex justifyContent="center">
            <Button onClick={() => paginationHandler("prev")} marginX="2">
              Previous Page
            </Button>
            <Text fontSize="2xl">{currentPage}</Text>
            <Button onClick={() => paginationHandler("next")} marginX="2">
              Next Page
            </Button>
          </Flex>
        </Box>
      </Center>
    );
  };
  
  export default ProductPage;