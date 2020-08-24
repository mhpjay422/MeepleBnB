@reviews.each do |review|
  json.reviews do
    json.set! review.id do
      json.extract! review, :id, :body, :rating, :listing_id, :created_at
      user = review.author
      json.set! "author" do
        json.partial! 'api/users/user', user: user
      end
    end
  end
end
json.extract! @host_count, :host_reviews 

