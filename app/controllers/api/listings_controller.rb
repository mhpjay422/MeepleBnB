class Api::ListingsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def index
    @listings = Listing.all
    render "api/listings/index"
  end

  def show
    @listing = Listing.find(params[:id])
    render "api/listings/show"
  end

  def create
    @listing = Listing.create!(listing_params)
    render "api/listings/show"
  end

  private

  def listing_params
    params.require(:listing).permit(
      :lat,
      :lng,
      :title,
      :description,
      :address,
      :price,
      :picture_url,
      photos: []
    )
  end
end
