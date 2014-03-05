module GamesHelper
  def all_my_games(id)
    Game.where(player_1: id) + Game.where(player_2: id)
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
