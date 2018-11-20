class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.integer :renter_id, null: false
      t.integer :listing_id, null: false
      t.integer :price, null: false
      t.datetime :date_start, null: false
      t.datetime :date_end, null: false
      t.string :status, null:false

      t.timestamps
    end

    add_index :bookings, :listing_id
  end
end
