require 'rails_helper'

RSpec.describe Api::ListingsController, :type => :controller do
  describe "GET index" do
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

    it "assigns @listings" do
      get :index, format: :json
      expect(assigns(:listings)).to eq([listing1])
      expect(assigns(:listings).class.name).to_not be_nil
    end
  end

  describe "GET show" do
    subject { get :show, format: :json }
    it "renders the show template" do
      expect(subject).to render_template(:show)
      expect(subject).to render_template("show")
    end

  end
end