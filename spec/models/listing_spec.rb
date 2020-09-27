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
#

require "rails_helper"
include FactoryBot::Syntax::Methods


RSpec.describe Listing do
  describe '::owned_by' do 

    FactoryBot.define do
      factory :user do
        first_name { "John" }
        last_name  { "Doe" }
        admin { false }
      end
    end

    it 'returns all listings for a host' do 
      host = User.create(
        email: "abc@gmail.com",
        password: "starwars",
        username: "abc"
      )
      
      listing1 = described_class.create(
        title: "very nice",
        description: "nice",
        address: "11 11st",
        price: 111,
        lat: 11,
        lng: 11,
        owner_id: host.id,
        picture_url: "abc"
      )
      listing2 = described_class.create(
        title: "very very nice",
        description: "nice",
        address: "11 11st",
        price: 111,
        lat: 11,
        lng: 11,
        owner_id: host.id,
        picture_url: "abc"
      )
    
      expect(described_class.owned_by(host)).to eq([listing1, listing2])  
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
end
