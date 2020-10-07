FactoryBot.define do 

  factory :review do 
    body { Faker::Lorem.characters(number: 10)}
    rating { Faker::Number.between(from: 1, to: 5) }
    author { create(:random_user)}
    listing { create(:random_listing)}
  end
end