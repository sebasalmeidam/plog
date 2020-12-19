class Cycle < ApplicationRecord
  belongs_to :activity

  def start_activity
    self.start_t = DateTime.now
    save
  end

  def pause_activity
    self.finish_t = DateTime.now
    time = (finish_t.to_time - start_t.to_time).to_f / 60
    self.cycle_time = time.round(0)
    save
  end

end
