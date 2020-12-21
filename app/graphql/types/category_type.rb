module Types
  class CategoryType < Types::BaseObject
    description 'CategoryList'

    field :id, ID, null: false
    field :name, String, null: false
  end
end