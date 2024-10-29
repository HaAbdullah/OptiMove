from stockfish import Stockfish

parameters = {
    "Debug Log File": "",
    "Contempt": 0,
    "Min Split Depth": 0,
    "Threads": 1,  # Adjust this based on your CPU capabilities
    "Ponder": "false",
    "Hash": 256,  # Adjust this based on available RAM
    "MultiPV": 1,
    "Skill Level": 20,
    "Move Overhead": 10,
    "Minimum Thinking Time": 20,  # Time in milliseconds
    "Slow Mover": 100,
    "UCI_Chess960": "false",
    "UCI_LimitStrength": "false",
    "UCI_Elo": 1350
}

stockfish = Stockfish(
    path=r"stockfish/stockfish-windows-x86-64-avx2.exe",
    # path="/usr/games/stockfish", #FOR DOCKER
    depth=18,
    parameters=parameters
)

def FENtoMove(FEN):
    stockfish.set_fen_position(FEN)
    return stockfish.get_best_move()
    
