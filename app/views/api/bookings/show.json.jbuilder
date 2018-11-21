json.set! @booking.id do
  json.partial! 'api/bookings/booking', booking: @booking
  json.photoUrls @booking.property.photos.map { |photo| url_for(photo) }
end
