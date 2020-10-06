# == Schema Information
#
# Table name: listings
#   
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  description :string           not null
#  address     :string           not null
#  price       :integer          not null
#  lat         :float            not null
#  lng         :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  picture_url :string           not null
#  owner_id    :integer

require "rails_helper"
# require "spec_helper"
# use if testing only ruby objects

RSpec.describe Listing do
  describe '::owned_by' do 
    let(:user) { create(:random_user) } #User.create({})
    let(:listing3) { create(:random_listing, owner_id: user.id) }
    let(:listing4) { create(:random_listing, owner_id: user.id) }
    
    it 'returns all listings for a host' do  
      expect(described_class.owned_by(user)).to eq([listing3, listing4])  
    end

    context 'when no listings are owned by the host' do
      it 'returns an empty array' do 
        host = User.create(
        email: "abc@gmail.com",
        password: "starwars",
        username: "abc"
        )
        host2 = User.create(
          email: "def@gmail.com",
          password: "def",
          username: "def"
        )
        listing1 = described_class.create(
          title: "very nice",
          description: "nice",
          address: "11 11st",
          price: 111,
          lat: 11,
          lng: 11,
          owner_id: host2.id,
          picture_url: "abc"
        )
        listing2 = described_class.create(
          title: "very very nice",
          description: "nice",
          address: "11 11st",
          price: 111,
          lat: 11,
          lng: 11,
          owner_id: host2.id,
          picture_url: "abc"
        )
        expect(described_class.owned_by(host)).to eq([])
      end
    end
  end

  describe "::total_review_count" do 
    let(:listing1) { create(:random_listing, random_reviews: 3) }
    let(:listing2) { create(:random_listing, random_reviews: 2) }
    let(:listing3) { create(:random_listing, random_reviews: 5) }
    
    context "when given no listings" do 
      it "returns zero" do
        expect(Listing.total_review_count([])).to eq(0)
      end
    end
    context "when given one listing" do 
      it "returns the total count for that listing" do 
        listings = [listing1]
        expect(Listing.total_review_count(listings)).to eq(3)
      end
    end  
    context "when given many listings" do
      it "returns the total reviews across all given listings" do
        listings = [listing1, listing2, listing3]
        expect(Listing.total_review_count(listings)).to eq(10)
      end
    end  
  end
end

Faker::UniqueGenerator.clear