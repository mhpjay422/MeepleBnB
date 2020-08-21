@reviews.each do |review|
  json.reviews do
    json.set! review.id do 
        json.extract! review, :id, :body, :rating, :author_id, :listing_id
    end
  end
end