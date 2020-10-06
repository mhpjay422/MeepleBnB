FactoryBot.define do
  factory :listing do
    title { "very nice" }
    description { "nice" }
    address{ "11 11st" }
    price { 111 }
    lat { 11 }
    lng { 11 }
    owner_id { 1 }
    picture_url { "abc" }
  end

  factory :random_listing, class: Listing do 
    title { Faker::Quote.unique.most_interesting_man_in_the_world }
    description { Faker::Quote.yoda }
    address { Faker::Address.unique.full_address }
    price { Faker::Number.within(range: 1..1000) }
    lat { Faker::Number.decimal(l_digits: 2, r_digits: 10) }
    lng { Faker::Number.decimal(l_digits: 2, r_digits: 10) }
    owner { create(:random_user) }
    picture_url { Faker::String.random(length: 7) }

    transient do 
      random_reviews { 0 }
    end

    after(:create) do |listing, evaluator|
      evaluator.random_reviews.times do 
        create(:review, listing: listing)
      end
    end
  end
end