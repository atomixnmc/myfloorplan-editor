import { useState, useEffect } from "react";
import { getModelCategories, searchModel } from "../../data/searchModelsEffect";
import { uniqBy, sortBy } from "lodash-es";

import {
  Box,
  CloseButton,
  Flex,
  Image,
  Icon,
  Text,
  Center,
  Square,
  useColorModeValue,
  Input,
  InputGroup,
  ListItem,
  UnorderedList,
  SimpleGrid,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";

import {
  FiCompass,
  FiCornerUpLeft,
  FiHome,
  FiList,
  FiFilter,
  FiSearch,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiChevronsRight,
  FiChevronsLeft,
  FiGift,
  FiGrid,
  FiTablet,
  FiSquare
} from "react-icons/fi";

const scrollbarCss = {
  "&::-webkit-scrollbar": {
    width: "6px"
  },
  "&::-webkit-scrollbar-track": {
    width: "6px"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "24px"
  }
};
export default function ModelsSearch({}) {
  const [pagination, setPagination] = useState({
    page: 0,
    totalRecords: 0,
    offset: 0,
    ascDesc: 1,
    limit: 24,
    order: "No order",
    isHasMore: true,
    isRequestingMore: false,
    lastOffset: 0,
    lastNum: 0
  });
  const [isAdding, setIsAdding] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [tag, setTag] = useState();
  const [modelList, setModelList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResultPanelOpen, setIsSearchResultPanelOpen] = useState(false);

  useEffect(() => {
    const fetchModelCategoriesData = async () => {
      await getModelCategories().then((responseData) => {
        // console.log(responseData);
        const list = responseData.data || responseData.items || responseData;
        setCategories(sortBy(list, "title"));
      });
    };
    fetchModelCategoriesData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchModelsData = async () => {
      const { offset, ascDesc, limit, order } = pagination;
      setIsSearched(false);
      setIsLoading(true);
      const result = await searchModel({
        searchKeyword,
        offset,
        limit,
        order,
        ascDesc,
        category,
        tag
      })
        .then((response) => {
          const addedList = response.items || response.data || response;
          let newList = [];
          if (isAdding) {
            // console.log({ isAdding }, "Adding");
            newList = uniqBy([...(modelList || []), ...addedList], "_id");
          } else {
            // console.log({ isAdding }, "Replace");
            newList = uniqBy(addedList, "_id");
          }
          let isHasMoreNew = true;
          if (addedList.length < limit) {
            isHasMoreNew = false;
          }
          setPagination({
            ...pagination,
            lastOffset: offset,
            lastNum: newList.length,
            isHasMore: isHasMoreNew,
            isRequestingMore: false,
            totalRecords: response.total || addedList.length
          });
          setModelList(newList);
          setIsLoading(false); //DONE!
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    };
    const isSearchingValid =
      !searchKeyword ||
      (searchKeyword &&
        (searchKeyword.trim().length === 0 ||
          searchKeyword.trim().length >= 3));
    if (isSearched && !isLoading && isSearchingValid) {
      fetchModelsData().catch(console.error);
    }
  }, [
    isSearched,
    searchKeyword,
    // modelList,
    category,
    pagination,
    tag
  ]);

  const handleStartSearch = () => {
    // console.log("TRY handleStartSearch");
    if (!isLoading) {
      setPagination({ ...pagination, page: 0, offset: 0 });
      setIsAdding(false);
    }
  };
  const handleLoadMoreItems = () => {
    const { isRequestingMore, offset, limit } = pagination;
    const perPage = limit;
    console.log("TRY loadMoreItems? -> ", {
      offset,
      pagination
    });
    if (!isLoading && !isRequestingMore) {
      // console.log("CALL - loadMoreItems -> ", offset);
      setPagination({
        ...pagination,
        isRequestingMore: true,
        offset: offset + perPage
      });
      setIsAdding(true);
    } else {
      // console.log("SKIP loadMoreItems -> ", offset);
    }
  };
  const goToPage = (page) => {
    const { limit } = pagination;
    const perPage = limit;
    // console.log("goToPage");
    if (!isLoading) {
      setPagination({ ...pagination, offset: page * perPage });
      // setIsCanSearch(true);
    }
  };
  const handleChangeAscDesc = (newAscDesc) => {
    if (!isLoading) {
      setPagination({ ...pagination, ascDesc: newAscDesc });
      setIsAdding(false);
    }
  };
  const handleChangePerPage = (newPerpage) => {
    // console.log("TRY handleChangePerPage");
    if (!isLoading) {
      setPagination({
        ...pagination,
        page: 0,
        offset: 0,
        limit: newPerpage
      });
      setIsAdding(false);
      // setPerPage(newPerpage);
      // setIsCanSearch(true);
    }
  };
  const handleChangeOrder = (newOrder) => {
    // console.log("TRY handleChangeOrder");
    if (!isLoading) {
      setPagination({ ...pagination, order: newOrder });
      setIsAdding(false);
    }
  };
  const handleKeywordChange = (val) => {
    // console.log("TRY handleKeywordChange");
    if (!isLoading) {
      setPagination({ ...pagination });
      setIsAdding(false);
      setSearchKeyword(val);
    }
  };
  const handleCategoryChange = (val) => {
    // console.log("TRY handleCategoryChange");
    if (!isLoading) {
      setPagination({ ...pagination, page: 0, offset: 0 });
      setIsAdding(false);
      setCategory(val);
    }
  };
  // const goToAssetDetail = () => {};

  const { limit, totalRecords, order, ascDesc } = pagination;
  let perPage = limit;

  return (
    <Box p={1} bg="gray.100">
      <Flex pl="4" p="2" bg="blue.200">
        <Box p="1" w="40px">
          <FiCornerUpLeft />
        </Box>
        <Box w="full">
          <Text fontSize="em" fontWeight="bold">
            Inventory
          </Text>
        </Box>
      </Flex>
      <InputGroup p="2" mb="2">
        <Input
          placeholder="Search"
          onKeyDown={(evt) => {
            if (evt.key === "Enter") {
              console.log("Submit search");
              setIsSearched(true);
            }
          }}
        />
        <InputRightElement>
          <FiSearch color="green.500" />
        </InputRightElement>
      </InputGroup>
      <Flex pl="4">
        <Box p="1" w="40px">
          <FiFilter />
        </Box>
        <Box w="full">
          <Text fontSize="em" fontWeight="bold">
            Categories
          </Text>
        </Box>
        <Box p="1" w="40px">
          <FiChevronsRight
            onClick={(evt) =>
              setIsSearchResultPanelOpen(!isSearchResultPanelOpen)
            }
          />
        </Box>
      </Flex>
      <Box
        mt="2"
        pl="6"
        h="70vh"
        bg="white"
        overflowY="scroll"
        css={scrollbarCss}
      >
        <UnorderedList>
          {categories.map((cat) => (
            <ListItem
              _hover={{
                color: "blue.500",
                fontSize: "bold",
                cursor: "pointer"
              }}
              key={cat.title}
              onClick={(evt) => {
                setCategory(cat.title);
                setIsAdding(false);
                setIsSearched(true);
              }}
            >
              {cat.title}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box
        position="absolute"
        right="-300px"
        top="64px"
        width="300px"
        p="2"
        bg="white"
        transition="3s ease"
        boxShadow="lg"
        display={isSearchResultPanelOpen ? "block" : "none"}
      >
        <Flex pl="4" mb="4">
          <Box p="1" w="40px">
            <FiList />
          </Box>
          <Box w="full">
            <Text fontSize="em" fontWeight="bold">
              Items
            </Text>
          </Box>
          <Box p="1" w="40px">
            <FiGrid />
          </Box>
          <Box p="1" w="40px">
            <FiSquare />
          </Box>
          <Box p="1" w="40px">
            <FiChevronsLeft
              onClick={(evt) =>
                setIsSearchResultPanelOpen(!isSearchResultPanelOpen)
              }
            />
          </Box>
        </Flex>
        <Box bg="white" h="85vh" overflowY="scroll" css={scrollbarCss}>
          {modelList.length > 0 ? (
            <SimpleGrid columns={3} spacing={2}>
              {modelList.map((model) => (
                <Box height="120px" mb="2">
                  <Image src={model.modelImgUrl} />
                  <Center>
                    <Text>{model.title}</Text>
                  </Center>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Center w="100%" bg="gray.100" h="full">
              <Text>Please search for items</Text>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
}
