@reviews.each do |review|
  json.reviews do
    json.set! review.id do
        json.partial! 'api/reviews/review', review: review 
    end
  end
end