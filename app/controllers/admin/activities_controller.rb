class Admin::ActivitiesController < Admin::AdminController
  before_action :find_activity, only: [:edit, :update, :start, :pause, :complete, :show]
  
  def show
    
  end

  def new
    @activity = Activity.new
  end

  def create
    @activity = Activity.new(activity_params)
    @activity.user_id = current_user.id
    @activity.status = "Waiting"

    if @activity.save
      flash[:notice] = "Activity created"
      redirect_to dashboard_path
    else
      flash.now[:notice] = "Activity not created"
      render :new      
    end    
  end

  def edit
  end

  def update
    if @activity.update(activity_params)
      redirect_to dashboard_path
    else
      flash.now[:danger] = 'Not updated'
      render 'edit'
    end
  end

  def start
    if %w(Waitin Paused).includes? @activity.status
      @cycle = @activity.cycles.build
      if @cycle.start_activity
        @activity.status = "In Progress"
        @activity.save
      end
      redirect_to dashboard_path
    else
      flash[:warning] = "Can't Start Activity again"
      redirect_to dashboard_path
    end
  end

  def pause
    if @activity.status == "In Progress"
      @cycle = @activity.cycles.last
      if @cycle.pause_activity
        @activity.status = "Paused"
        @activity.save
      end
      redirect_to dashboard_path
    else
      flash[:warning] = "Can't pause if not started"
      redirect_to dashboard_path
    end
  end

  def complete
    if @activity.status == "Paused"
      @activity.status = "Completed"
      @activity.save
      redirect_to dashboard_path
    else
      flash[:warning] = "Can't end if not Paused"
      redirect_to dashboard_path
    end
  end

  def description_list
    
  end

  private
  def activity_params
    params.fetch(:activity, {}).permit(:name, :description, :category_id)
  end

  def find_activity
    @activity = Activity.find(params[:id])
  end
end
