class Api::BookingsController < ApplicationController
  before_action :ensure_logged_in, only: [:create]

  def approve
    authorize current_booking_request
    current_booking_request.approve!
    render "/api/bookings/show"
  end

  def deny
    current_booking_request.deny!
    render "/api/bookings/show"
  end

  def index
    @bookings = current_user.bookings
    render "/api/bookings/index"
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.renter_id = current_user.id;
    if @booking.save
      render "/api/bookings/show"
    else
      flash.now[:errors] = @booking.errors.full_messages
      render "/api/bookings/show"
    end
  end

  def new
    @booking = Booking.new
  end

  def destroy
    @booking = Booking.find(params[:id])
    authorize @booking
    @booking.destroy
    render "/api/bookings"
  end



  private

  def current_booking_request
    @booking ||= Booking.includes(:listing).find(params[:id])
  end

  def current_listing
    current_booking_request.listing
  end

  def booking_params
    params.require(:booking).permit(
        :listing_id, 
        :date_end, 
        :date_start, 
        :status, 
        :price
     )
  end

end
