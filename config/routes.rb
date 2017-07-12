Rails.application.routes.draw do

  devise_for :users, :controllers => { :registrations => "users/registrations" }
  
  get 'home/index'

  get 'map/google'

  get 'map/daum'

  get '/cafes' => 'cafes#index'
  post '/cafes' => 'cafes#create'
  get '/cafes/new' => 'cafes#new', :as => 'new_cafe'
  get '/cafes/:name/edit' => 'cafes#edit', :as => 'edit_cafe'
  get '/cafes/:name' => 'cafes#show', :as => 'cafe'
  patch '/cafes/:id' => 'cafes#update'
  put '/cafes/:id' => 'cafes#update'
  delete '/cafes/:id' => 'cafes#destroy'
  get '/cafes/:name/history_list' => 'cafes#history_list', :as => 'historylist_cafe'
  get '/cafes/:name/history/:ver' => 'cafes#history', :as => 'history_cafe'
  get '/cafes/:name/differ' => 'cafes#differ', :as => 'differ_cafe'

  root 'home#index'
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
