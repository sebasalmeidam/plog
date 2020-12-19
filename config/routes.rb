Rails.application.routes.draw do
  devise_for :users, path: 'admin', path_names: { sign_in: 'plog_session' }
  namespace :admin do
    get 'dashboard', to: "users#dashboard"
  end
  root to: 'static_pages#home'
end
