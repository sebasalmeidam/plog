Rails.application.routes.draw do
  
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  devise_for :users, path: 'admin', path_names: { sign_in: 'plog_session' }
  namespace :admin do
    resources :categories
    resources :projects, only: [:new, :create]
    resources :activities, only: [:new, :create, :edit, :update, :show] do
      member do
        get :start, :start
        get :pause, :pause
        get :complete, :complete
      end
    end
  end
  
  get '/sa/validate-access', to: 'admin/projects#validate_keycode'    
  
  get 'dashboard', to: "users#dashboard"
  root to: 'static_pages#home'
end
