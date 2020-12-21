module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :activities, [Types::ActivityType], null: true do
      description "List of activities"
    end
    def activities
      Activity.all.includes(:cycles)
    end

    field :categories, [Types::CategoryType], null: true do
      description "List of categories"
    end
    def categories
      Category.all
    end
  end
end
