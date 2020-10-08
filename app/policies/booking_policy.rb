class BookingPolicy < ApplicationPolicy
  attr_reader :user, :booking

  def initialize(user, booking)
    @user = user
    @booking = booking
  end


  def destroy?
    byebug
    user.id == booking.renter_id
  end

  def approve?
    user.id == booking.listing.owner_id
  end
  
end