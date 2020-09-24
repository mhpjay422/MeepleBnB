require "rails_helper"

RSpec.describe Listing do
  describe '::owned_by' do 
    it 'returns all listings for a host' do 
      host = User.create(
        email: "abc@gmail.com",
        password: "starwars",
        username: "abc"
      )
      listing1 = Listing.create(
        title: "very nice",
        description: "nice",
        address: "11 11st",
        price: 111,
        lat: 11,
        lng: 11,
        owner_id: host.id,
        picture_url: "abc"
      )
      listing2 = Listing.create(
        title: "very very nice",
        description: "nice",
        address: "11 11st",
        price: 111,
        lat: 11,
        lng: 11,
        owner_id: host.id,
        picture_url: "abc"
      )
    
      expect(Listing.owned_by(host)).to eq([listing1, listing2])  
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
        listing1 = Listing.create(
          title: "very nice",
          description: "nice",
          address: "11 11st",
          price: 111,
          lat: 11,
          lng: 11,
          owner_id: host2.id,
          picture_url: "abc"
        )
        listing2 = Listing.create(
          title: "very very nice",
          description: "nice",
          address: "11 11st",
          price: 111,
          lat: 11,
          lng: 11,
          owner_id: host2.id,
          picture_url: "abc"
        )
        expect(Listing.owned_by(host)).to eq([])
      end
    end
  end
end