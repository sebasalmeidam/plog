module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :activities, [Types::ActivityType], null: true do
      description "List of activities"
      argument :category, String, required: false
    end
    def activities(category:)
      if category.present?
        cat = Category.find_by(name: category)
        return Activity.where(category_id: cat.id).includes(:cycles)  
      end
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
