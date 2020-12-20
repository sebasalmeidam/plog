module Types
  class ActivityType < Types::BaseObject
    description 'ActivityList'

    field :id, ID, null: false
    field :name, String, null: false
    field :details, [String], null: true
    field :status, String, null: false

    def details
      return ['test']
    end
  end
end