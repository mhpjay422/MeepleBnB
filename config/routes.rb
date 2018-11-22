Rails.application.routes.draw do
  namespace :api, default: {format: :json} do

    resources :users, only: [:create] do
      resources :bookings, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :listings, only: [:index, :show, :create] do
      resources :bookings, only: [:create]
    end
    resources :bookings, only: [:approve, :deny, :new]
  end

  root "static_pages#root"
end
