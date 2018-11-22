@bookings.each do |booking|
  json.bookings do
    json.set! booking.id do
      json.partial! 'api/bookings/booking', booking: booking
    end
  end
  json.users do
    user = booking.listing.owner
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
  json.listings do
    listing = booking.listing
    json.set! listing.id do
      json.extract! booking.listing, :id, :title, :description, :price, :lat, :lng, :picture_url, :address
      json.photoUrls booking.listing.photos.map { |photo| url_for(photo) }
    end
  end
end
