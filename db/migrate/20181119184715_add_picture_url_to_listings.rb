class AddPictureUrlToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :picture_url, :string, null: false
  end
end
