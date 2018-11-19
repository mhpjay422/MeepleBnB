json.listing do
  json.extract! listing, :id, :title, :description, :price, :lat, :lng, listing: @listing
end
