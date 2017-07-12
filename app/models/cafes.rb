class Cafes < ApplicationRecord
  has_paper_trail meta: { :ip => :ip }
end
