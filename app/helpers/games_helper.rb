module GamesHelper
  def all_my_games(id)
    Game.where(player_1_id: id) + Game.where(player_2_id: id)
  end

  def generateCoral
    coral = ""
    240.times {coral << '0'}
    toAdd = 24;
    while toAdd > 0
      index = rand(240)
      if coral[index]=='0'
        coral[index]='1'
        toAdd = toAdd - 1
      end
    end
    coral
  end
end
