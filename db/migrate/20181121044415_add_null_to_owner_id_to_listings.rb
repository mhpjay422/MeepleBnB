class AddNullToOwnerIdToListings < ActiveRecord::Migration[5.2]
  def change
    change_column_null :listings, :owner_id, null: false
  end
end
