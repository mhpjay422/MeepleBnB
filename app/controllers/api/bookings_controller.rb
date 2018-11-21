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
    @booking= Booking.new(booking_params)
    if @booking.save
      redirect_to "/api/listings/show"
    else
      flash.now[:errors] = @booking.errors.full_messages
      render "/api/listings/show"
    end
  end

  def new
    @booking = Booking.new
  end

  def destroy
    @booking = Booking.find(params[:id])
    @booking.destroy
    render "/api/listings"
  end



  private

  def current_booking_request
    @booking ||=
      Booking.includes(:listing).find(params[:id])
  end

  # def current_listing
  #   current_booking_request.listing
  # end

  def booking_params
    params.require(:booking).permit(:listing_id, :date_end, :date_start, :status, :price)
  end

end
