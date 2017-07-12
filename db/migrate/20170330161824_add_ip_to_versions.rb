class AddIpToVersions < ActiveRecord::Migration[5.0]
  def change
    add_column :versions, :ip, :string
  end
end
