class RemovePasswordAddPasswordDigest < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :password_digest, :string, null: false
    remove_column :users, :password
  end
end
