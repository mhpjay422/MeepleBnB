class Listing < ApplicationRecord
  validates :lat, :lng, :title, :description, :address, :price, :picture_url, :owner_id, presence: true

  has_many_attached :photos

  has_many :bookings,
    foreign_key: :listing_id,
    class_name: "Booking"

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: "User"
end
