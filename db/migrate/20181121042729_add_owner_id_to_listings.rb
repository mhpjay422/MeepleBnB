class AddOwnerIdToListings < ActiveRecord::Migration[5.2]
  def up
    add_column :listings, :owner_id, :integer
  end
end
