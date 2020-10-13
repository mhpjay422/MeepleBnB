FactoryBot.define do
  factory :booking do
   renter  { create(:random_user) }
   listing { create(:random_listing) }
   price { 1 }
   date_start { Date.yesterday } 
   date_end   { Date.tomorrow }
   status  { "PENDING" }   
  end
end

