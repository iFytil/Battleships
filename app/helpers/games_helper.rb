module GamesHelper
  def all_my_games(id)
    Game.where(player_1: id) + Game.where(player_2: id)
  end
end
