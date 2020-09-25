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

class Listing < ApplicationRecord
  validates :lat, :lng, :title, :description, :address, :price, :picture_url, :owner_id, presence: true

  has_many_attached :photos

  has_many :bookings,
  foreign_key: :listing_id,
  class_name: "Booking"

  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: "User"

  has_many :reviews,
  foreign_key: :listing_id, 
  class_name: "Review"

  def self.in_bounds(bounds)
  self.where("lat < ?", bounds[:northEast][:lat])
    .where("lat > ?", bounds[:southWest][:lat])
    .where("lng > ?", bounds[:southWest][:lng])
    .where("lng < ?", bounds[:northEast][:lng])
  end

  def self.owned_by(host)
    Listing.where(owner: host)
  end

end
