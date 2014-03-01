class PagesController < ApplicationController
  def lobby
  	@username = current_user.username
  end
end
