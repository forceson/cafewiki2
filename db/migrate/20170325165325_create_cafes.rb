class CreateCafes < ActiveRecord::Migration[5.0]
  def change
    create_table :cafes do |t|
      
      t.string :markericon
      t.string :name
      t.string :phone
      t.float :lat
      t.float :lng
      t.string :address
      t.text :content
      t.integer :americano
      t.string :size
      t.string :toilet
      t.string :parking
      t.string :allnight
      t.string :floor
      t.string :ip
      t.integer :ver
      
      t.timestamps
    end
  end
end
