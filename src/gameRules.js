export default class GameRules {
    static checkRules(players, gameType) {

        switch (gameType) {
            case 'ranked': {
                if(players.length % 2 === 0)
                    return true
                return false
            }
            default: return true
        }        
    }
}