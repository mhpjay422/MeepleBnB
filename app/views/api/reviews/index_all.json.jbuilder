@reviews.each do |review|
  json.reviews do
    json.set! review.id do
      json.extract! review, :id, :body, :rating, :listing_id, :created_at
    end
  end
end