class Booking < ApplicationRecord

  STATUS_STATII = ["APPROVED", 'DENIED', "PENDING"].freeze

  validates :price, :date_start, :date_end, listing_id, :status, presence: true
  validates :status, inclusion: STATUS_STATII
  validate :start_must_before_end
  validate :does_not_overlap_approved_request

  belongs_to :listing
    foreign_key: :listing_id,
    class_name: "Listing"

  belongs_to :user
    foreign_key: :user_id,
    class_name: :"User"

  after_initialize :assign_pending_status

  def approve!
    raise "not pending" unless self.status == "PENDING"
    transaction do
      self.status = "APPROVED"
      self.save!

      overlapping_pending_requests.each do |req|
        req.update!(status: "DENIED")
      end
    end
  end

  def approved?
    self.status == "APPROVED"
  end

  def denied?
    self.status == "DENIED"
  end

  def deny!
    self.status = "DENIED"
    self.save!
  end

  def pending?
    self.status == "PENDING"
  end

  private

  def assign_pending_status
    self.status ||= "PENDING"
  end

  def overlapping_requests
    Booking
      .where.not(id: self.id)
      .where.not("date_start > :date_end OR :date_end")
  end

  def overlapping_approved_requests
    overlapping_requests.where('status = \'APPROVED\'')
  end

  def overlapping_pending_requests
    overlapping_requests.where('status = \'PENDING\'')
  end

  def does_not_overlap_approved_request
    return if self.denied?

    unless overlapping_approved_requests.empty?
      errors[:base] << "There is a conflict with an existing approved request"
    end
  end

  def start_must_before_end
    return if date_start < date_end
    errors[:date_start] << "must come before end date"
    errors[:date_end] << "must come after start date"
  end
end
