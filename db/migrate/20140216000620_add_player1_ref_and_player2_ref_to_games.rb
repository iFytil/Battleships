class AddPlayer1RefAndPlayer2RefToGames < ActiveRecord::Migration
  def change
    add_reference :games, :player1, index: true
    add_reference :games, :player2, index: true
  end
end
