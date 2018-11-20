class Api::BookingsController < ApplicationController
  def approve
    current_booking_request.approve!
    redirect_to "/api/listings/show"
  end

  def deny
    current_booking_request.deny!
    redirect_to "/api/listings/show"
  end

  def create
    @booking_request= Booking.new(booking_params)
    if @booking_request.save
      redirect_to "/api/listings/show"
    else
      flash.now[:errors] = @booking_request.errors.full_messages
      render "/api/listings/show"
    end
  end

  def new
    @booking_request = Booking.new
  end



  private

  def current_booking_request
    @booking_request ||=
      Booking.includes(:listing).find(params[:id])
  end

  # def current_listing
  #   current_booking_request.listing
  # end

  def booking_params
    params.require(:booking).permit(:listing_id, :date_end, :date_start, :status, :price)
  end

end
