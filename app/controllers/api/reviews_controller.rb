class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create]

    def index
        
        @current_listing = current_listing
        @reviews = @current_listing.reviews
        debugger
        render "/api/reviews/index"
    end

    # def create
    #     @review = Review.new(review_params)
    #     @review.author_id = current_user.id
    #     if @review.save
    #         render "/api/reviews/show"
    #     else
    #         flash.now[:errors] = @review.errors.full_messages
    #         render "/api/reviews/show"
    #     end
    # end

    # def destroy
    #     @review = Review.find(params[:id])
    #     @review.destroy
    #     render json: @review
    # end

    # def new 
    #     @review = Review.new
    # end

    # def update
    #     @review = Review.find(params[:id].edit)
    #     @review.update(review_params)
    #     render json: @review
    # end

    private

    def current_listing
      Listing.find(params[:listing_id])
    end

    def review_params
        params.require(:review).permit(
            :body,
            :listing_id,
            :author_id, 
            :rating
        )
    end
end