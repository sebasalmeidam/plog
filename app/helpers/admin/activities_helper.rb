module Admin::ActivitiesHelper
  def description_lines(description)
    description.squish.split("/").map(&:lstrip).map(&:strip)
  end
end
