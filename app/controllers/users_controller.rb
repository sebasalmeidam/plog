class UsersController < ApplicationController
  before_action :authenticate_user!

  def dashboard
   @activities = current_user.activities
  end
end