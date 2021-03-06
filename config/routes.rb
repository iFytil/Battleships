Battleship::Application.routes.draw do

  get 'game/:id' => 'games#show', :as => :game
  get 'user/:id' => 'users#show', :as => :user

  get '/games/:id/start' => 'games#start', :as => :game_start
  post '/games/:id/start' => 'games#shiporder', :as => :game_order
  get '/games/:id/coral' => 'games#coral', :as => :game_coral
  post '/games/:id/coral' => 'games#coral_handle', :as => :game_coral_handle
  get '/games/:id/forfeit' => 'games#forfeit', :as => :game_forfeit

  # Access the lobby
  get 'lobby' => 'pages#lobby', :as => :lobby

  # Create an invite_id from :sender to :receiver 
  get 'invite/send' => 'invites#new', :as => :send_invite

  # Respond to an invite_id with an optional :accept decision
  get 'invite/respond/:id' => 'invites#destroy', :as => :respond_invite

  get 'invites/all' => 'invites#list', :as => :list_invites
  get 'games/all' => 'games#list', :as => :list_games
  get 'users/all' => 'users#list', :as => :list_users

  devise_for :users
  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  root 'pages#home'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
