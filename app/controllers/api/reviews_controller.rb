class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create]

    def index
        @reviews = current_listing.reviews
        render "/api/reviews/index"
    end

    def create
        @review = Review.create!(review_params)
        render json: @review
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        render json: @review
    end

    # def update
    #     @review = Review.find(params[:id].edit)
    #     @review.update(review_params)
    #     render json: @review
    # end

    private

    def current_listing
      Listing.find(params[:id])
    end

    def review_params
        params.require(:review).permit(
            :body, 
            :rating
        )
    end
end