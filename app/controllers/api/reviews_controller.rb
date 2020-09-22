class Api::ReviewsController < ApplicationController
    before_action :ensure_logged_in, only: [:create]

    def index
      if params[:listing_id] == "all"
        @reviews = Review.all
        render "/api/reviews/index_all"
      else 
        @host = listing_host        
        @listings = Listing.all.select { |listing| listing.owner_id == @host.id} 
        @host_reviews = @listings.reduce(0) { |sum, listing| sum + listing.reviews.length}
        @host_count = {"host_reviews": @host_reviews}
        @current_listing = current_listing
        @reviews = @current_listing.reviews
        render "/api/reviews/index"
      end
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

    def listing_host
      User.find(current_listing.owner_id)
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