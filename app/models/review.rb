# == Schema Information
#
# Table name: reviews
#
#  id         :bigint(8)        not null, primary key
#  body       :text             not null
#  rating     :integer          not null
#  author_id  :integer          not null
#  listing_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Review < ApplicationRecord 
    
    validates :body, :rating, :author_id, :listing_id, presence:true

    belongs_to :author, 
    foreign_key: :author_id, 
    class_name: "User"

    belongs_to :listing,
    foreign_key: :listing_id,
    class_name: "Listing"

end
