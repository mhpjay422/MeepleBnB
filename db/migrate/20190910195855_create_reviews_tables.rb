class CreateReviewsTables < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews_tables do |t|
      t.text :body, null: false
      t.integer :rating, null: false
      t.integer :author_id, null: false
      t.integer :listing_id, null: false
      t.timestamps
    end
  end
end
