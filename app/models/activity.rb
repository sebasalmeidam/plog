class Activity < ApplicationRecord

  has_many :cycles
  has_one_attached :image
  belongs_to :user
  belongs_to :category

  STATUS = ["Waiting", "In Progress", "Paused", "Completed"]
  validates :status, inclusion: { in: STATUS}
  validates :image, content_type: {in: ["image/png", "image/jpg", "image/jpeg"], message: 'Format error'}

end
