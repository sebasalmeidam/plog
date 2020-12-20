class CreateCycles < ActiveRecord::Migration[6.1]
  def change
    create_table :cycles do |t|
      t.references :activity
      t.datetime :start_t
      t.datetime :finish_t
      t.integer :cycle_time, default: 0

      t.timestamps
    end
  end
end
