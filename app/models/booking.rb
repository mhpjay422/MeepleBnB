# == Schema Information
#
# Table name: bookings
#
#  id         :bigint(8)        not null, primary key
#  renter_id  :integer          not null
#  listing_id :integer          not null
#  price      :integer          not null
#  date_start :datetime         not null
#  date_end   :datetime         not null
#  status     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  guests     :integer
#

class Booking < ApplicationRecord

  STATUS_STATII = ["APPROVED", 'DENIED', "PENDING"].freeze

  validates :date_start, :date_end, :listing_id, :status, :price, presence: true
  validates :status, inclusion: STATUS_STATII
  validate :start_must_before_end
  validate :does_not_overlap_approved_request

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: "Listing"

  belongs_to :renter,
    foreign_key: :renter_id,
    class_name: "User"

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
      .where(listing_id: listing_id)
      .where(
        "(date_start > :date_start AND date_start < :date_end) OR 
        ( date_end > :date_start AND date_end < :date_end) OR 
        ( date_start < :date_start AND date_end > :date_end )",
        { date_start: date_start, date_end: date_end }
      )
  end

  # overlapping request would mean that the start date is within the current request time or the end date is within the current request time.
  # examples:
  # Booking 1 - Oct 10-14
  # Booking 2 - Oct 9-11
  # Booking 3 - Oct 13-15
  # Booking 4 - Oct 11-12
  # Booking 5 - Oct 9-15
  # Booking 6 - Oct 8-9 * shouldn't be returned
  # Booking 7 - Oct 15-16 * shouldn't be returned
  # Date.strptime('2020-10-10', '%Y-%m-%d')

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
