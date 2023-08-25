import { serverUrl, defaultHeader } from "../config/serverConfig";

export const searchModel = ({
  searchKeyword,
  offset = 0,
  perPage = 60,
  order = null,
  ascDesc = 1,
  category = null,
  tag = null
}) => {
  var queryPart = `$skip=${offset}&$limit=${perPage}`;
  if (order != "No order") {
    queryPart = `${queryPart}&$sort[${order}]=${ascDesc}`;
  }
  if (category) {
    queryPart = `${queryPart}&category=${encodeURIComponent(category)}`;
    // queryPart = `${queryPart}&categories[$in][]=${category}`;
  }
  if (tag) {
    queryPart = `${queryPart}&tags[$in][]=${tag}`;
  }
  if (searchKeyword && searchKeyword.trim() !== "") {
    queryPart = `$search=${searchKeyword}&${queryPart}`;
  }
  return fetch(`${serverUrl}/models?${queryPart}`, {
    method: "GET",
    headers: defaultHeader
  }).then((response) => {
    return response.json();
  });
};

export const searchModelPage = (searchKeyword, page = 0, perPage = 24) => {
  return searchModel(searchKeyword, page * perPage, perPage);
};

export const getModelCategories = () => {
  return fetch(
    `${serverUrl}/modelCategories/?isInteriorCollection=false&active=true&$limit=1000`,
    {
      method: "GET",
      headers: defaultHeader
    }
  ).then((response) => {
    return response.json();
  });
};
