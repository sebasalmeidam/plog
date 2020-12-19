class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.references :user
      t.references :category
      t.string :name
      t.text :description
      t.string :status
      t.string :video_url

      t.timestamps
    end
  end
end
