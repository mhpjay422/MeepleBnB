require 'rails_helper'

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
    let(:user) { create(:random_user) }
    
    it "creates a new listing" do
      
      post :create, params: { user: "name", email: "email", format: :json}

      list_params = {
        title: "very nice",
        description: "nice",
        address: "11 11st",
        price: 111,
        lat: 11,
        lng: 11,
        owner_id: user.id,
        picture_url: "abc"
      }
        
      post :create, params: list_params, format: :json
      
      expect(Listing.count).to eq(1)
    end
  end
end

#sign in user - in testing
#request specs
#implement approve deny destroy