import {
  Box,
  Text,
  Input,
  Center,
  FormLabel,
  Flex,
  Button,
} from "@chakra-ui/react";
import { axiosInstance } from "../configs/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

const UsersCard = ({ firstName, lastName, gender, jobArea }) => {
  return (
    <Box
      margin="2"
      borderWidth={8}
      borderColor="gray"
      borderRadius="10px"
      width="220px"
      padding="4"
      textAlign="center"
    >
      <Text fontSize="large" fontWeight="bold">
        <Text as="span">{firstName}</Text>
        <Text as="span"> {lastName}</Text>
      </Text>
      <Text>Gender: {gender}</Text>
      <Text>Job: {jobArea}</Text>
    </Box>
  );
};

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchValue, setSearchValue] = useState(
      searchParams.get("search") ? searchParams.get("search") : ""
  );

  const [currentPage, setCurrentPage] = useState(
      searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  )

  const pageLimit = 12;

  const inputHandler = ((event) => {
      const { value } = event.target

      setSearchInput(value)
  })

  const fetchUsers = (
    queryParams = {
      params: {
        _limit: pageLimit,
      },
    }
  ) => {
    axiosInstance
      .get("/users", queryParams)
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan di server");
      });
  };

  const renderUsers = () => {
    return usersList.map((val) => {
      return (
        <UsersCard
          firstName={val.first_name}
          lastName={val.last_name}
          gender={val.gender}
          jobArea={val.job_area}
        />
      );
    });
  };

  const searchButtonHandler = () => {
      if (searchInput) {
          setSearchValue(searchInput)
          setCurrentPage(1)
          
          setSearchParams({ search: searchInput, page: 1 })
      } else {
          setSearchValue("")
          setSearchParams({ page: 1 })
      }
  }

  const paginationHandler = (direction = "next") => {
    let newPage = currentPage

    if (direction === "back" && currentPage === 1) {
        return
    }

    if (direction === "next") {
        newPage += 1
    } else if (direction === "back") {
        newPage -= 1
    }

    if (searchValue) {
        setSearchParams({ page: newPage, search: searchValue })
    } else {
        setSearchParams({ page: newPage })
    }

    setCurrentPage(newPage)
  }

  useEffect(() => {
    let first_name = searchParams.get("search")
    let _page = searchParams.get("page") 

    fetchUsers({
        params: {
            _limit: pageLimit,
            _page: _page,
            first_name: first_name
        }
    });
  }, [currentPage, searchValue]);

  return (
    <Center>
      <Box position="static" width="xl">
        <Text fontSize="2xl" marginBottom="8" textAlign="center">
          Users Page
        </Text>

        <FormLabel textAlign="center" htmlFor="searchUsers">
          Find Users
        </FormLabel>
        <Input onChange={inputHandler} id="searchUsers" />
        <Flex justifyContent="center">
        <Button onClick={searchButtonHandler} marginTop="4">
          Search
        </Button>
        </Flex>
        <Flex margin="4" justifyContent="center">
        <Button onClick={() => paginationHandler("back")} margin="2">Back Page</Button>
        <Text fontWeight="bold" fontSize="2xl" margin="2">{currentPage}</Text>
        <Button onClick={() => paginationHandler("next")} margin="2">Next Page</Button>
        </Flex>
      </Box>

      <Box marginY="8">
        <Text fontWeight="bold" textAlign="center">
          Users Name
        </Text>
        <Flex width="800px" wrap="wrap" marginTop="4" justifyContent="center">
          {renderUsers()}
        </Flex>
      </Box>
    </Center>
  );
};

export default UsersPage;
