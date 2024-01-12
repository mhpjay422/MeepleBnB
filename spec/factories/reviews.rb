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

FactoryBot.define do 

  factory :review do 
    body { Faker::Lorem.characters(number: 10)}
    rating { Faker::Number.between(from: 1, to: 5) }
    author { create(:random_user)}
    listing { create(:random_listing)}
  end
end
