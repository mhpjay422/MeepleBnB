FactoryBot.define do 

  factory :review do 
    body { Faker::String.random}
    rating { Faker::Number.between(from: 1, to: 5) }
    author { create(:random_user)}
    listing { create(:random_listing)}
  end
end