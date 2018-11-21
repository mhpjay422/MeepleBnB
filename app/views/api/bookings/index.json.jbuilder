@bookings.each do |booking|
  json.set! booking.id do

    json.partial! 'api/bookings/booking', booking: booking

    json.property do
      json.partial! 'api/listings/listing', listing: booking.listing
      json.photoUrls booking.property.photos.map { |photo| url_for(photo) }
    end

    json.user do
      json.partial! 'api/users/user', user: booking.listing.host
    end


  end
end
