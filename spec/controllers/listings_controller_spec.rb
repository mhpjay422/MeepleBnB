require 'rails_helper'
require 'support/spec_test_helper'

RSpec.describe Api::ListingsController, :type => :controller do
  describe "GET index" do
    render_views
    let(:user) { create(:random_user) }
    let(:listing1) { create(:random_listing, owner_id: user.id) }
    subject { get :index, format: :json }

    it "renders the index template" do
      expect(subject).to render_template(:index)
      expect(subject).to render_template("index")
    end

    it "returns a successful response" do
      get :index, format: :json
      expect(response).to be_successful
    end

    it "returns a response with the corresponding data" do
      listing1
      get :index, format: :json
      
      body = JSON.parse(response.body)
      expect(body[listing1.id.to_s]["picture_url"]).to eq(listing1.picture_url)
    end
  end

  describe "GET show" do
    let(:user) { create(:random_user) }
    let(:listing1) { create(:random_listing, owner_id: user.id) }
    it "renders the show template" do
      form_params = {
        id: listing1.id,
        title: "very nice",
        description: "nice",
        address: "11 11st",
        price: 111,
        lat: 11 ,
        lng: 11,
        owner_id:  1,
        picture_url: "abc",
      }
      
      expect(get :show, params: form_params, format: :json).to render_template(:show)
      expect(get :show, params: form_params, format: :json).to render_template("show")
    end
  end

  describe "POST create" do
    let(:user1) { create(:random_user) }
    
    it "creates a new listing" do

      # Api::ListingsController = @controller
      # @controller = Api::SessionsController
      
      # post :create, params: { user: {username: "user", password: "password"}, format: :json}
      # user = FactoryBot.create(:random_user)
      # login_as(user, :scope => :random_user)
      # sign_in user
      # sign_in { create(:random_user) }
      # user = User.where(:login => user.to_s).first if user.is_a?(Symbol)
      # request.session[:user] = user1.id
      # session[:session_token] = 1

      list_params = {
        title: "very nice",
        description: "nice",
        address: "11 11st",
        price: 111,
        lat: 11,
        lng: 11,
        owner_id: user1.id,
        picture_url: "abc"
      }

      # @controller = Api::ListingsController
      login(user1)
      post :create, params: {listing: list_params}, format: :json
      
      expect(Listing.count).to eq(1)
    end
  end
end

#sign in user - in testing
#request specs
#implement approve deny destroy