json.listing do
  json.extract! listing, :id, :title, :description, :price, :lat, :lng, :picture_url, :address, listing: @listing
  json.photoUrls @listing.photos.map { |file| url_for(file) }
end
