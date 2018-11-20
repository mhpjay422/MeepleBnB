Rails.application.routes.draw do
  namespace :api, default: {format: :json} do

    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :listings, only: [:index, :show, :create]
    resources :bookings, only: [:approve, :deny, :create, :new]
  end

  root "static_pages#root"
end
