module Types
  class ActivityType < Types::BaseObject
    description 'ActivityList'

    field :id, ID, null: false
    field :name, String, null: false
    field :details, [String], null: true
    field :status, String, null: false
    field :start_time, String, null: true
    field :finish_time, String, null: true
    field :total_time, String, null: true

    def details
      object.description.squish.split("/").map(&:lstrip).map(&:strip)
    end

    def start_time
      if object.cycles.empty?
        return '-'
      else
        return object.cycles.first.start_t.strftime("%Y-%m-%d %H:%M")
      end
    end

    def finish_time
      if object.cycles.empty?
        return '-'
      else
        finish = object.cycles.first.finish_t
        return finish.nil? ? '-' : finish.strftime("%Y-%m-%d %H:%M")
      end
    end

    def total_time
      if object.cycles.empty?
        return '-'
      else
        return object.cycles.sum(&:cycle_time)
      end
    end

  end
end