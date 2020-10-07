# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  password_digest :string           not null
#

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
