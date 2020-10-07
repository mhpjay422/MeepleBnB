FactoryBot.define do
  factory :user do
    email { "hanS@gmail.com" }
    password  { "starwars" }
    username { "hanS" }
  end

  factory :random_user, class: User do 
    email { Faker::Lorem.characters(number: 10) }
    password  { Faker::Lorem.characters(number: 10) }
    username { Faker::Lorem.characters(number: 10) }
  end
end