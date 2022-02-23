// Unsplash
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
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

const api_key = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

const getURL = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latLong = "28.6139,77.2090",
  limit = 9
) => {
  const photos = await getListOfCoffePhotoStores(limit + 5);

  const response = await fetch(getURL(latLong, "coffee stores", limit), {
    headers: {
      Authorization: api_key,
    },
  });

  const data = await response.json();

  return data.results.map((res, i) => {
    return {
      id: res.fsq_id,
      name: res.name,
      address:
        res.location.address ||
        res.location.formatted_address ||
        res.location.locality ||
        "",
      neighbourhood:
        (res.location.neighbourhood && res.location.neighbourhood[0]) ||
        res.location.cross_street ||
        "",
      imgUrl: photos[i],
    };
  });
};
