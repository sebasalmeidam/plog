module Types
  class CategoryType < Types::BaseObject
    description 'CategoryList'

    field :id, ID, null: false
    field :name, String, null: false
    field :activities, [Types::ActivityType], null: true
    field :totalActivities, Integer, null:false
    field :totalTime, Integer, null:false

    def totalActivities
      object.activities.size
    end

    def totalTime
      object.activities.joins(:cycles).map(&:total_time).sum
    end
  end
end