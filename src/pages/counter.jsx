import { Center, Flex, Text, Input, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";

const CounterPage = () => {
  const [count, setCount] = useState(0);

  const countSelector = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const counterButton = (dir) => {
    if (dir === "plus") {
      dispatch({
        type: "INCREMENT_COUNTER",
      });
    } else if (dir === "minus") {
      dispatch({
        type: "DECREMENT_COUNTER",
      });
    } else if (dir === "reset") {
      dispatch({
        type: "RESET_COUNTER",
      });
    }
  };

  return (
    <>
      <Center>
        <Flex alignItems="center" margin="10">
          <Button onClick={() => counterButton("minus")}>-</Button>
          <Text marginX="4" fontSize="lg">
            {countSelector.count}
          </Text>
          <Button onClick={() => counterButton("plus")}>+</Button>
        </Flex>
      </Center>
      <Center>
        <Box>
          <Input width="sm" margin="10"></Input>
          <Flex justifyContent="center">
            <Box marginX="2">
              <Button>Set Counter</Button>
            </Box>
            <Box marginX="2">
              <Button onClick={() => counterButton("reset")}>
                Reset Counter
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default CounterPage;
