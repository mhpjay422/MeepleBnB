class Listing < ApplicationRecord
  validates :lat, :lng, :title, :description, :address, :price, :picture_url, presence: true

  has_many :reviews

end
