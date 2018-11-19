@listings.each do |listing|
  json.set! listing.id do
    json.extract! listing, :id, :title, :description, :price, :lat, :lng, :picture_url
    # json.photoUrls listing.photos.map { |file| url_for(file) }
  end
end
