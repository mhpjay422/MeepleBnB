class Review < ApplicationRecord 
    
    validates :body, :rating, :author_id, :listing_id, presence:true

    belongs_to :author, 
    foreign_key: :author_id, 
    class_name: "User"

    belongs_to :listing,
    foreign_key: :listing_id,
    class_name: "Listing"

end