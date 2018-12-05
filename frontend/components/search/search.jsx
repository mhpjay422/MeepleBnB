import React from "react";
import { Link } from "react-router-dom";
import ListingMap from "../listing_map/listing_map";
import ListingIndex from "../listings/listing_index";

const Search = () => {
  return (
    <div>
      <ListingMap />
      <ListingIndex />
    </div>
  );
};

export default Search;
