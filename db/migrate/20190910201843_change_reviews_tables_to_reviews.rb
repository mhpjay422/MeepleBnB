class ChangeReviewsTablesToReviews < ActiveRecord::Migration[5.2]
  def change
    rename_table :reviews_tables, :reviews
  end
end
