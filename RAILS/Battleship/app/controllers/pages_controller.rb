class PagesController < ApplicationController
  def lobby
  	@username = Player.find(current_user.player_id).username
  end
end
