// Unsplash
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getListOfCoffePhotoStores = async (limit) => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee, coffee shops",
    page: 1,
    perPage: limit,
    orientation: "landscape",
  });
  const photoResults = photos.response.results;
  return photoResults.map((res) => res.urls.small);
};

const api_key = process.env.FOURSQUARE_API_KEY;

const getURL = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const limit = 15;
  const photos = await getListOfCoffePhotoStores(limit + 5);

  const response = await fetch(
    getURL("28.6139,77.2090", "coffee stores", limit),
    {
      headers: {
        Authorization: api_key,
      },
    }
  );

  const data = await response.json();

  return data.results.map((res, i) => {
    return {
      ...res,
      imgUrl: photos[i],
    };
  });
};
