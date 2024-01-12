class Api::ListingsController < ApplicationController
  before_action :ensure_logged_in, only: [:create]

  def index
    val = params[:filters]
    @listings = val ? Listing.in_bounds(params[:filters][:bounds]) : Listing.all
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
      :filters,
      :lat,
      :lng,
      :title,
      :description,
      :address,
      :price,
      :picture_url,
      :bounds,
      :owner_id,
      photos: []
    )
  end
end
