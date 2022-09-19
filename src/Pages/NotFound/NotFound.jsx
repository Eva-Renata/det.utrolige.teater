export const NotFound = () => {
  //henter den aktuelle url fra browseren
  const path = window.location.href;
  //.substring - fjerner alt før /, så vi kan se den præcise side hvor vi har en fejl
  const url = path.substring(path.lastIndexOf("/") + 1);
  return <> siden {url} 404 - NotFound</>;
};
