class Ship < ActiveRecord::Base
  validates_presence_of :shiptype_id
  belongs_to :shiptype
end
