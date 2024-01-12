Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do

    resources :users, only: [:create] do
      resources :bookings, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :listings, only: [:index, :show, :create] do
      resources :reviews, only: [:index, :create, :destroy]
      resources :bookings, only: [:create]
    end
    resources :bookings, only: [:approve, :deny, :new] do
      post '/approve', to: 'bookings#approve'
    end
  end

  root "static_pages#root"
end
