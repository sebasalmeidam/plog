class Admin::AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :validate_admin

  private
  def validate_admin
    unless current_user.admin
      redirect_to root_path
    end
  end

end