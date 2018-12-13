class Listing < ApplicationRecord
  validates :lat, :lng, :title, :description, :address, :price, :picture_url, :owner_id, presence: true

  has_many_attached :photos

  has_many :bookings,
    foreign_key: :listing_id,
    class_name: "Booking"

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: "User"

  def self.in_bounds(bounds)
  self.where("lat < ?", bounds[:northEast][:lat])
    .where("lat > ?", bounds[:southWest][:lat])
    .where("lng > ?", bounds[:southWest][:lng])
    .where("lng < ?", bounds[:northEast][:lng])
  end

end
