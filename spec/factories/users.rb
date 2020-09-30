FactoryBot.define do
  factory :user do
    email { "hanS@gmail.com" }
    password  { "starwars" }
    username { "hanS" }
  end

  factory :random_user, class: User do 
    email { Faker::Internet.email }
    password  { Faker::String.random(length: 6) }
    username { Faker::String.random(length: 8) }
  end
end