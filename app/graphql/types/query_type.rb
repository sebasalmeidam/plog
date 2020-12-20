module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :activities, [Types::ActivityType], null: true do
      description "List of activities"
    end
    def activities
      Activity.all
    end
  end
end
