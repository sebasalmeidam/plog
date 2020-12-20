class Admin::ProjectsController < Admin::AdminController

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      redirect_to dashboard_path
    else
      render :new
    end
  end

  def validate_keycode
    @key_front = params[:code].to_s
    @project = Project.last
    if @key_front == @project.keycode
      render json: {status: 200, mensaje: 'Continue'} and return
    else
      render json: {status: 400, mensaje: 'Wrong Code'} and return
    end

  end

  private
  def project_params
    params.fetch(:project, {}).permit(:name, :keycode)
  end
end