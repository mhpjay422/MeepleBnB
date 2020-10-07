class BookingPolicy < ApplicationPolicy
  
  def destroy?
    user.id == @booking.renter_id
  end
  
end